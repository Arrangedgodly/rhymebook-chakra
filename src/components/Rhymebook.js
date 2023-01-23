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
import { useDisclosure, useToast } from "@chakra-ui/react";

function Rhymebook({ currentUser }) {
  const [activeNote, setActiveNote] = useState({});
  const { _id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [lastWord, setLastWord] = useState("");
  const timer = useRef(null);
  const [rhymes, setRhymes] = useState([]);
  const [soundAlikes, setSoundAlikes] = useState([]);
  const [adjectives, setAdjectives] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [words, setWords] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [freqFollowers, setFreqFollowers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { rhy, sdl, adj, noun, rlwd, syn, ant, fqfl, engine, max } =
    currentUser.preferences;
  const toast = useToast();
  const toastIdRef = useRef();

  const updateToast = (title, description, status, duration, isClosable) => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { title , description, status, duration, isClosable })
    }
  }

  const addToast = (title, description, status, position) => {
    toastIdRef.current = toast({ title, description, status, position })
  }

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
    addToast('Adding Tag', 'Adding the tag to the active note...', 'info')
    addNoteTag(name, color, activeNote._id)
      .then((res) => {
        setActiveNote(res);
        updateToast('Tag added successfully', '', 'success', '1000', true)
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteNoteTag = (noteId, tagId) => {
    addToast('Removing Tag', 'Removing the tag from the active note...', 'info')
    deleteNoteTag(noteId, tagId)
      .then((res) => {
        setActiveNote(res);
        updateToast('Tag removed successfully', '', 'success', '1000', true)
      })
      .catch((err) => console.log(err));
  };

  const handleAPICalls = () => {
    if (lastWord !== "") {
      if (rhy) {
        getRhyme(lastWord, engine, title, max)
          .then((res) => setRhymes(res))
          .catch((err) => console.log(err));
      }
      if (sdl) {
        getSoundAlike(lastWord, engine, title, max)
          .then((res) => setSoundAlikes(res))
          .catch((err) => console.log(err));
      }
      if (adj) {
        getRelatedAdjectives(lastWord, engine, title, max)
          .then((res) => setAdjectives(res))
          .catch((err) => console.log(err));
      }
      if (noun) {
        getRelatedNouns(lastWord, engine, title, max)
          .then((res) => setNouns(res))
          .catch((err) => console.log(err));
      }
      if (rlwd) {
        getRelatedWords(lastWord, engine, title, max)
          .then((res) => setWords(res))
          .catch((err) => console.log(err));
      }
      if (syn) {
        getSynonyms(lastWord, engine, title, max)
          .then((res) => setSynonyms(res))
          .catch((err) => console.log(err));
      }
      if (ant) {
        getAntonyms(lastWord, engine, title, max)
          .then((res) => setAntonyms(res))
          .catch((err) => console.log(err));
      }
      if (fqfl) {
        getFrequentFollowers(lastWord, engine, title, max)
          .then((res) => setFreqFollowers(res))
          .catch((err) => console.log(err));
      }
    }
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
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (title !== "" && body !== "") {
        addToast('Auto-saving...', 'Your progress is being automatically saved. Please wait...', 'info', 'top')
        saveNote(title, body, activeNote._id).then((res) => {
          setActiveNote(res);
          updateToast('Note auto-saved!', '', 'success', '1000', true, 'top')
        });
      }
    }, 1000);
  }, [title]);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (title !== "" && body !== "") {
        addToast('Auto-saving...', 'Your progress is being automatically saved. Please wait...', 'info', 'top')
        saveNote(title, body, activeNote._id).then((res) => {
          setActiveNote(res);
          updateToast('Note auto-saved!', '', 'success', '1000', true, 'top')
        });
      }
    }, 1000);
  }, [body]);

  useEffect(() => {
    setTitle(activeNote.title);
    setBody(activeNote.body);
  }, [activeNote]);

  return (
    <>
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
      />
      <Rhymetags
        isOpen={isOpen}
        onClose={onClose}
        handleAddNoteTag={handleAddNoteTag}
      />
    </>
  );
}

export default Rhymebook;
