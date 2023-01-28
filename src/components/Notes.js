import {
  Wrap,
  WrapItem,
  HStack,
  Button,
  Skeleton,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { getNotes, deleteNote } from "../utils/api";
import { useState, useEffect, useRef } from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Note from "./Note";
import Tags from "./Tags";

function Notes({ currentUser, handleAuth }) {
  const [notesList, setNotesList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
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
            <Button boxShadow="dark-lg" colorScheme='purple'>
              Add Tags
            </Button>
            <Button boxShadow="dark-lg" colorScheme='red'>Delete Cards</Button>
          </HStack>
        )}
        {sortedList.length > 0
          ? sortedList.map((note) => (
              <Note
                note={note}
                activeTag={activeTag}
                handleDeleteNote={handleDeleteNote}
                handleTagClick={handleTagClick}
                key={note._id}
                handleCardSelectChange={handleCardSelectChange}
              />
            ))
          : notesList.map((note) => (
              <Note
                note={note}
                activeTag={activeTag}
                handleDeleteNote={handleDeleteNote}
                handleTagClick={handleTagClick}
                key={note._id}
                handleCardSelectChange={handleCardSelectChange}
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
        handleTagClick={handleTagClick}
        activeTag={activeTag}
      />
    </Skeleton>
  );
}

export default Notes;
