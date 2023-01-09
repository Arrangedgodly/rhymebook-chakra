import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  FormHelperText,
  Button
} from "@chakra-ui/react";
import Rhymeinput from "./Rhymeinput";
import Rhymebar from "./Rhymebar";
import { useState } from "react";

function Rhymebook() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  }

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