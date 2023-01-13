import {
  Center,
  Wrap,
  WrapItem,
  Text,
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
import { getNotes, deleteNote } from "../utils/api";
import { useState, useEffect } from "react";

function Notes() {
  const [notesList, setNotesList] = useState([]);
  const bg = useColorModeValue("gray.300", "gray.500");

  const handleDeleteNote = (id) => {
    deleteNote(id)
      .then(() => {
        setNotesList((notesList) => notesList.filter((c) => c._id !== id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNotes()
      .then((res) => setNotesList(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrap align="center" justify="center" spacing="3vw">
      {notesList.map((note) => (
        <WrapItem key={note._id} flexDirection="column" alignItems="center">
          <Center
            w="25vw"
            h="25vw"
            bg={bg}
            borderRadius="5%"
            flexDirection="column"
            justifyContent="space-around"
          >
            <Text fontSize="2xl" as="b">
              {note.title}
            </Text>
            <Text fontSize="sm">{note.body}</Text>
          </Center>
          <Wrap>
            <Button colorScheme="yellow" h="5vw" w="12vw">
              Edit
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="red" h="5vw" w="12vw">
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
                  <Button onClick={() => handleDeleteNote(note._id)}>
                    Confirm
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Wrap>
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default Notes;
