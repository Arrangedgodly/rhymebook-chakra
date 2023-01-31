import {
  Wrap,
  WrapItem,
  HStack,
  Heading,
  Select,
  Icon,
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
  createNote,
  deleteNote,
  addNotePin,
  deleteNotePin,
  addNoteTag,
} from "../utils/api";
import { useState, useEffect, useRef } from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import Note from "./Note";
import Tags from "./Tags";
import Rhymetags from "./Rhymetags";
import { BsFilter } from "react-icons/bs";

function Notes({ currentUser, handleAuth }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notesList, setNotesList] = useState([]);
  const [sortType, setSortType] = useState('');
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

  const handleAddNote = () => {
    addToast(
      "Adding New Note...",
      "Adding the new note to your database. Please wait...",
      "info"
    );
    createNote()
      .then((note) => {
        setNotesList((notesList) => [...notesList, note]);
        updateToast("Note successfully added!", "", "success", "1000", true);
      })
      .catch((err) => console.log(err));
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

  const handleSortNotes = (e) => {
    if (e.target.value === 'newest' || e.target.value === '') {
      setSortType('newest');
    } else if (e.target.value === 'oldest') {
      setSortType('oldest');
    } else if (e.target.value ===  'alph') {
      setSortType('alph');
    } else if (e.target.value === 'revAlph') {
      setSortType('revAlph');
    }
  }

  useEffect(() => {
    if (sortType === 'newest') {
      setNotesList(notesList => notesList.sort((a, b) => {
        if (a.lastEdited > b.lastEdited) {
          return 1;
        }
        if (b.lastEdited > a.lastEdited) {
          return -1;
        }
        return 0;
      }))
    }
    if (sortType === 'oldest') {
      setNotesList(notesList => notesList.sort((a, b) => {
        if (a.lastEdited > b.lastEdited) {
          return -1;
        }
        if (b.lastEdited > a.lastEdited) {
          return 1;
        }
        return 0;
      }))
    }
    if (sortType === 'alph') {
      setNotesList(notesList => notesList.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
        if (b.title > a.title) {
          return 1;
        }
        return 0;
      }))
    }
    if (sortType === 'revAlph') {
      setNotesList(notesList => notesList.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (b.title > a.title) {
          return -1;
        }
        return 0;
      }))
    }
  }, [sortType])

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
        <Select
          icon={<Icon as={BsFilter} />}
          placeholder="Filter Notes"
          maxW="30vw"
          size="lg"
          onChange={handleSortNotes}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alph">A-Z</option>
          <option value="revAlph">Z-A</option>
        </Select>
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
          <Wrap w="78vw" marginBottom="3vh" spacing="1vh" justify="center">
            <Heading w="100%" size="md">
              Pinned
            </Heading>
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
        <Heading w="100%" size="md">
          Notes
        </Heading>
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
          <PlusSquareIcon
            boxSize={75}
            color="green.300"
            _hover={{ color: "green.500" }}
            marginBottom="3vh"
            onClick={handleAddNote}
          />
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
