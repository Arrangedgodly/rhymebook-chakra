import {
  Center,
  Wrap,
  WrapItem,
  Button,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { getNotes } from "../utils/api";
import { useState, useEffect } from "react";

function Notes() {
  const [notesList, setNotesList] = useState([]);
  const bg = useColorModeValue("gray.300", "gray.500");

  useEffect(() => {
    getNotes()
      .then((res) => setNotesList(res))
      .catch((err) => console.log(err));
  });

  return (
    <Wrap align="center" justify="center">
      {notesList.map((note) => (
        <WrapItem key={note._id}>
          <Center w="50vw" h="5vw" bg={bg}>
            {note.title}
          </Center>
          <Button colorScheme="yellow" h="5vw" w="5vw">
            Edit
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red" h="5vw" w="5vw">
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Delete Confirmation</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete the selected note? This action
                can not be reversed!
              </PopoverBody>
              <PopoverFooter>
                <Button>Confirm</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default Notes;
