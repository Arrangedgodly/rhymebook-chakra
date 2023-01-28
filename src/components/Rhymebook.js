import Rhymeinput from "./Rhymeinput";
import Rhymebar from "./Rhymebar";
import Rhymetags from "./Rhymetags";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createNote,
  getNote,
  saveNote,
  addNoteTag,
  getRhyme,
  getSoundAlike,
  getRelatedAdjectives,
  getRelatedNouns,
  getRelatedWords,
  getSynonyms,
  getAntonyms,
  getFrequentFollowers,
  deleteNoteTag,
} from "../utils/api";
import { getLastWord } from "../utils/constants";
import {
  Flex,
  useDisclosure,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

function Rhymebook({ currentUser }) {
  const [activeNote, setActiveNote] = useState({});
  const { _id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [lastWord, setLastWord] = useState("");
  const timer = useRef(null);
  const [rhymes, setRhymes] = useState([]);
  const [rhyLoaded, setRhyLoaded] = useState(false);
  const [soundAlikes, setSoundAlikes] = useState([]);
  const [sdlLoaded, setSDLLoaded] = useState(false);
  const [adjectives, setAdjectives] = useState([]);
  const [adjLoaded, setAdjLoaded] = useState(false);
  const [nouns, setNouns] = useState([]);
  const [nounsLoaded, setNounsLoaded] = useState([]);
  const [words, setWords] = useState([]);
  const [wordsLoaded, setWordsLoaded] = useState(false);
  const [synonyms, setSynonyms] = useState([]);
  const [synLoaded, setSynLoaded] = useState(false);
  const [antonyms, setAntonyms] = useState([]);
  const [antLoaded, setAntLoaded] = useState(false);
  const [freqFollowers, setFreqFollowers] = useState([]);
  const [fqflLoaded, setFQFLLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { rhy, sdl, adj, noun, rlwd, syn, ant, fqfl, engine, max } =
    currentUser.preferences;
  const toast = useToast();
  const toastIdRef = useRef();
  const bg = useColorModeValue("gray.400", "gray.800");

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

  const addToast = (
    title,
    description,
    status,
    duration,
    isClosable,
    position
  ) => {
    toastIdRef.current = toast({
      title,
      description,
      status,
      duration,
      isClosable,
      position,
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLastWordChange = (e) => {
    if (e.key === " " || e.key === "Enter") {
      setLastWord(getLastWord(body));
    }
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleCreateNewNote = () => {
    createNote()
      .then((res) => setActiveNote(res))
      .catch((err) => console.log(err));
  };

  const handleGetNote = () => {
    getNote(_id)
      .then((res) => setActiveNote(res))
      .catch((err) => console.log(err));
  };

  const handleAddNoteTag = (name, color) => {
    addToast("Adding Tag", "Adding the tag to the active note...", "info");
    addNoteTag(name, color, activeNote._id)
      .then((res) => {
        setActiveNote(res);
        updateToast("Tag added successfully", "", "success", "1000", true);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteNoteTag = (noteId, tagId) => {
    addToast(
      "Removing Tag",
      "Removing the tag from the active note...",
      "info"
    );
    deleteNoteTag(noteId, tagId)
      .then((res) => {
        setActiveNote(res);
        updateToast("Tag removed successfully", "", "success", "1000", true);
      })
      .catch((err) => console.log(err));
  };

  const resetTableState = () => {
    setRhyLoaded(false);
    setSDLLoaded(false);
    setAdjLoaded(false);
    setNounsLoaded(false);
    setWordsLoaded(false);
    setSynLoaded(false);
    setAntLoaded(false);
    setFQFLLoaded(false);
  }

  const handleAPICalls = () => {
    resetTableState();
    if (lastWord !== "") {
      if (rhy) {
        getRhyme(lastWord, engine, title, max)
          .then((res) => {
            setRhymes(res)
            setRhyLoaded(true)
          })
          .catch((err) => console.log(err));
      }
      if (sdl) {
        getSoundAlike(lastWord, engine, title, max)
          .then((res) => {
            setSoundAlikes(res)
            setSDLLoaded(true)
          })
          .catch((err) => console.log(err));
      }
      if (adj) {
        getRelatedAdjectives(lastWord, engine, title, max)
          .then((res) => {
            setAdjectives(res)
            setAdjLoaded(true)
          })
          .catch((err) => console.log(err));
      }
      if (noun) {
        getRelatedNouns(lastWord, engine, title, max)
          .then((res) => {
            setNouns(res)
            setNounsLoaded(true)
          })
          .catch((err) => console.log(err));
      }
      if (rlwd) {
        getRelatedWords(lastWord, engine, title, max)
          .then((res) => {
            setWords(res)
            setWordsLoaded(true)
          })
          .catch((err) => console.log(err));
      }
      if (syn) {
        getSynonyms(lastWord, engine, title, max)
          .then((res) => {
            setSynonyms(res)
            setSynLoaded(true)
          })
          .catch((err) => console.log(err));
      }
      if (ant) {
        getAntonyms(lastWord, engine, title, max)
          .then((res) => {
            setAntonyms(res)
            setAntLoaded(true)
          })
          .catch((err) => console.log(err));
      }
      if (fqfl) {
        getFrequentFollowers(lastWord, engine, title, max)
          .then((res) => {
            setFreqFollowers(res)
            setFQFLLoaded(true)
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleSaveNote = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (body !== "" && title !== undefined && body !== undefined) {
        addToast(
          "Auto-saving...",
          "Your progress is being automatically saved. Please wait...",
          "info",
          "1000",
          true,
          "top"
        );
        saveNote(title, body, activeNote._id).then((res) => {
          setActiveNote(res);
          updateToast("Note auto-saved!", "", "success", "1000", true, "top");
        });
      }
    }, 1000);
  };

  useEffect(() => {
    if (_id) {
      handleGetNote(_id);
    } else {
      handleCreateNewNote();
    }
  }, []);

  useEffect(() => {
    handleAPICalls();
  }, [lastWord]);

  useEffect(() => {
    handleSaveNote();
  }, [title]);

  useEffect(() => {
    handleSaveNote();
  }, [body]);

  useEffect(() => {
    setTitle(activeNote.title);
    setBody(activeNote.body);
  }, [activeNote]);

  return (
    <Flex bg={bg} minH="90vh">
      <Rhymeinput
        body={body}
        title={title}
        handleTitleChange={handleTitleChange}
        handleBodyChange={handleBodyChange}
        handleLastWordChange={handleLastWordChange}
        onOpen={onOpen}
        activeNote={activeNote}
        handleDeleteNoteTag={handleDeleteNoteTag}
      />
      <Rhymebar
        currentUser={currentUser}
        rhymes={rhymes}
        soundAlikes={soundAlikes}
        adjectives={adjectives}
        nouns={nouns}
        words={words}
        synonyms={synonyms}
        antonyms={antonyms}
        freqFollowers={freqFollowers}
        rhyLoaded={rhyLoaded}
        sdlLoaded={sdlLoaded}
        adjLoaded={adjLoaded}
        nounsLoaded={nounsLoaded}
        wordsLoaded={wordsLoaded}
        synLoaded={synLoaded}
        antLoaded={antLoaded}
        fqflLoaded={fqflLoaded}
      />
      <Rhymetags
        isOpen={isOpen}
        onClose={onClose}
        handleAddNoteTag={handleAddNoteTag}
      />
    </Flex>
  );
}

export default Rhymebook;
