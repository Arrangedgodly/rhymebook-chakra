import Rhymeinput from "./Rhymeinput";
import Rhymebar from "./Rhymebar";
import { useState, useRef, useEffect } from "react";
import { createNote, saveNote } from "../utils/api";

function Rhymebook() {
  const [activeNote, setActiveNote] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const timer = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleCreateNewNote = () => {
    createNote()
      .then(res => setActiveNote(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    handleCreateNewNote()
  }, [])

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (title !== '' && body !== '') {
        saveNote(title, body, activeNote._id)
          .then(res => setActiveNote(res))
      }
    }, 1000);
  }, [title]);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (title !== '' && body !== '') {
        saveNote(title, body, activeNote._id)
          .then(res => setActiveNote(res))
      }
    }, 1000);
  }, [body]);

  return (
    <>
      <Rhymeinput
        body={body}
        title={title}
        handleTitleChange={handleTitleChange}
        handleBodyChange={handleBodyChange}
      />
      <Rhymebar />
    </>
  );
}

export default Rhymebook;
