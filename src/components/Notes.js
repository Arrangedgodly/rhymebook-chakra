import {
  Card,
  Heading,
  HStack,
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
  CardHeader,
  CardBody,
  CardFooter,
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
    <Wrap align="center" justify="center" spacing="3vw" marginTop='3vh'>
      {notesList.map((note) => (
        <WrapItem key={note._id} flexDirection="column" alignItems="Card">
          <Card
            w="20vw"
            h="20vw"
            bg={bg}
            borderRadius="5%"
            flexDirection="column"
            justifyContent="space-around"
          >
            <CardHeader>
              <Heading noOfLines={1}>{note.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="lg" noOfLines={3}>{note.body}</Text>
            </CardBody>
            <CardFooter>
              <HStack w='100%'>
                <Button colorScheme="yellow" size='lg' w='50%'>
                  Edit
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="red" size='lg' w='50%'>
                      Delete
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Delete Confirmation</PopoverHeader>
                    <PopoverBody>
                      Are you sure you want to delete the selected note? This
                      action can not be reversed!
                    </PopoverBody>
                    <PopoverFooter>
                      <Button onClick={() => handleDeleteNote(note._id)}>
                        Confirm
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </HStack>
            </CardFooter>
          </Card>
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default Notes;
