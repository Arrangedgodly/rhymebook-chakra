import {
  Wrap,
  WrapItem,
  HStack,
  Heading,
  Button,
  Skeleton,
  useToast,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  getNotes,
  deleteNote,
  addNotePin,
  deleteNotePin,
  addNoteTag,
} from "../utils/api";
import { useState, useEffect, useRef } from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Note from "./Note";
import Tags from "./Tags";
import Rhymetags from "./Rhymetags";

function Notes({ currentUser, handleAuth }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notesList, setNotesList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [pinnedList, setPinnedList] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const toast = useToast();
  const toastIdRef = useRef();
  const bg = useColorModeValue("gray.400", "gray.800");

  const handleCardSelectChange = (id) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes((selectedNotes) =>
        selectedNotes.filter((note) => note !== id)
      );
    } else {
      setSelectedNotes((selectedNotes) => [...selectedNotes, id]);
    }
  };

  const handlePinAdd = (id) => {
    addNotePin(id).then((note) => {
      setNotesList((notesList) => notesList.filter((item) => item._id !== id));
      setNotesList((notesList) => [...notesList, note]);
    });
  };

  const handlePinDelete = (id) => {
    deleteNotePin(id).then((note) => {
      setNotesList((notesList) => notesList.filter((item) => item._id !== id));
      setNotesList((notesList) => [...notesList, note]);
    });
  };

  const updateToast = (title, description, status, duration, isClosable) => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        title,
        description,
        status,
        duration,
        isClosable,
      });
    }
  };

  const addToast = (title, description, status) => {
    toastIdRef.current = toast({ title, description, status });
  };

  const handleDeleteNote = (id) => {
    addToast(
      "Deleting Note",
      "Removing the note from your database...",
      "info"
    );
    deleteNote(id)
      .then(() => {
        setNotesList((notesList) => notesList.filter((c) => c._id !== id));
        updateToast("Note successfully removed!", "", "success", "1000", true);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteNotes = () => {
    addToast(
      "Deleting Notes...",
      `Notes Deleted: 0 / ${selectedNotes.length}`,
      "info"
    );
    for (let i = 0; i < selectedNotes.length; i++) {
      deleteNote(selectedNotes[i])
        .then((card) => {
          setNotesList((notesList) =>
            notesList.filter((c) => c._id !== card._id)
          );
          setSelectedNotes((selectedNotes) =>
            selectedNotes.filter((c) => c !== card._id)
          );
          updateToast(
            "Deleting Notes...",
            `Notes Deleted: ${i + 1} / ${selectedNotes.length}`,
            "info",
            "1000",
            false
          );
        })
        .catch((err) => console.log(err));
    }
    updateToast("Notes removed successfully!", "", "success", "2000", true);
  };

  const handleAddNoteTag = (name, color) => {
    addToast(
      "Adding Note Tags...",
      `Tags Added: 0 / ${selectedNotes.length}`,
      "info"
    );
    for (let i = 0; i < selectedNotes.length; i++) {
      addNoteTag(name, color, selectedNotes[i]).then((note) => {
        setNotesList((notesList) =>
          notesList.filter((item) => item._id !== selectedNotes[i])
        );
        setNotesList((notesList) => [...notesList, note]);
      });
    }
    updateToast("Tags added successfully!", "", "success", "2000", true);
  };

  const handleTagClick = (name) => {
    if (activeTag !== name) {
      setActiveTag(name);
    } else {
      setActiveTag("");
    }
  };

  const resetNotes = () => {
    setIsLoaded(false);
    getNotes()
      .then((res) => {
        setNotesList(res);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    resetNotes();
  }, []);

  useEffect(() => {
    setPinnedList(notesList.filter((note) => note.pinned === true));
  }, [notesList]);

  useEffect(() => {
    if (activeTag === "") {
      setSortedList([]);
    } else {
      setSortedList(
        notesList.filter((note) =>
          note.tags.find((tag) => tag.name === activeTag)
        )
      );
    }
  }, [activeTag]);

  useEffect(() => {
    if (!currentUser) {
      handleAuth();
    }
  }, []);

  return (
    <Skeleton
      isLoaded={isLoaded}
      fadeDuration={2}
      display="flex"
      flexDirection="row-reverse"
      minH="87vh"
      bg={bg}
    >
      <Wrap
        align="flex-start"
        justify="center"
        spacing="1vw"
        marginTop="3vh"
        w="78vw"
        minH="87vh"
        bg={bg}
      >
        {selectedNotes.length > 0 && (
          <HStack
            w="100%"
            align="center"
            justify="center"
            position="fixed"
            bottom="0"
            zIndex="2"
          >
            <Button boxShadow="dark-lg" colorScheme="purple" onClick={onOpen}>
              Add Tags
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button boxShadow="dark-lg" colorScheme="red">
                  Delete Cards
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Delete Multiple Cards?</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete the selected notes? This
                  action can not be reversed!
                </PopoverBody>
                <PopoverFooter>
                  <Button onClick={() => handleDeleteNotes()}>Confirm</Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </HStack>
        )}
        {sortedList.length === 0 && pinnedList.length > 0 && (
        <Wrap w="78vw" marginBottom="3vh" spacing='1vh' justify="center">
          <Heading w='100%' size='md'>Pinned</Heading>
          {pinnedList.map((note) => (
            <Note
              note={note}
              activeTag={activeTag}
              handleDeleteNote={handleDeleteNote}
              handleTagClick={handleTagClick}
              key={note._id}
              handleCardSelectChange={handleCardSelectChange}
              handlePinAdd={handlePinAdd}
              handlePinDelete={handlePinDelete}
              selectedNotes={selectedNotes}
            />
          ))}
        </Wrap>
      )}
      <Heading w='100%' size='md'>Notes</Heading>
        {sortedList.length > 0
          ? sortedList.map((note) => (
              <Note
                note={note}
                activeTag={activeTag}
                handleDeleteNote={handleDeleteNote}
                handleTagClick={handleTagClick}
                key={note._id}
                handleCardSelectChange={handleCardSelectChange}
                handlePinAdd={handlePinAdd}
                handlePinDelete={handlePinDelete}
                selectedNotes={selectedNotes}
              />
            ))
          : notesList
              .filter((item) => item.pinned === false)
              .map((note) => (
                <Note
                  note={note}
                  activeTag={activeTag}
                  handleDeleteNote={handleDeleteNote}
                  handleTagClick={handleTagClick}
                  key={note._id}
                  handleCardSelectChange={handleCardSelectChange}
                  handlePinAdd={handlePinAdd}
                  handlePinDelete={handlePinDelete}
                  selectedNotes={selectedNotes}
                />
              ))}
        <WrapItem w="100%" display="flex" justifyContent="center">
          <Link to="/notes/new">
            <PlusSquareIcon
              boxSize={75}
              color="green.300"
              _hover={{ color: "green.500" }}
              marginBottom="3vh"
            />
          </Link>
        </WrapItem>
      </Wrap>
      <Tags
        notesList={notesList}
        pinnedList={pinnedList}
        handleTagClick={handleTagClick}
        activeTag={activeTag}
      />
      <Rhymetags
        isOpen={isOpen}
        onClose={onClose}
        handleAddNoteTag={handleAddNoteTag}
      />
    </Skeleton>
  );
}

export default Notes;
