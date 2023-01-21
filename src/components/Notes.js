import {
  Card,
  Heading,
  HStack,
  Wrap,
  WrapItem,
  Text,
  Button,
  IconButton,
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
import { EditIcon, DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Notes() {
  const [notesList, setNotesList] = useState([]);
  const bg = useColorModeValue("gray.300", "gray.500");
  const edit = useColorModeValue("yellow.500", "yellow.300");
  const deleteColor = useColorModeValue("red.500", "red.300");

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
    <Wrap align="center" justify="center" spacing="3vw" marginTop="3vh">
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
              <Heading noOfLines={1} fontSize="xl">
                {note.title}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" noOfLines={8}>
                {note.body}
              </Text>
            </CardBody>
            <CardFooter>
              <HStack w="100%" justify="center">
                <Link to={`/notes/${note._id}`}>
                  <IconButton
                    colorScheme="yellow"
                    variant="ghost"
                    icon={<EditIcon color={edit} boxSize={10} w="50%" />}
                  />
                </Link>
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      variant="ghost"
                      colorScheme="red"
                      icon={
                        <DeleteIcon color={deleteColor} boxSize={10} w="50%" />
                      }
                    />
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
      <WrapItem w="100%" display="flex" justifyContent="center">
        <Link to="/">
          <IconButton
            variant="ghost"
            size="lg"
            boxSize={75}
            icon={<PlusSquareIcon boxSize={75} />}
            colorScheme="green"
          />
        </Link>
      </WrapItem>
    </Wrap>
  );
}

export default Notes;
