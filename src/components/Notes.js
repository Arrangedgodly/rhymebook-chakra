import {
  Card,
  Heading,
  HStack,
  Wrap,
  WrapItem,
  Text,
  Button,
  Badge,
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
  Skeleton,
  useToast
} from "@chakra-ui/react";
import { getNotes, deleteNote } from "../utils/api";
import { useState, useEffect, useRef } from "react";
import { EditIcon, DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Notes() {
  const [notesList, setNotesList] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const bg = useColorModeValue("gray.300", "gray.500");
  const edit = useColorModeValue("yellow.500", "yellow.300");
  const deleteColor = useColorModeValue("red.500", "red.300");
  const toast = useToast();
  const toastIdRef = useRef();

  const updateToast = (title, description, status, duration, isClosable) => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { title , description, status, duration, isClosable })
    }
  }

  const addToast = (title, description, status) => {
    toastIdRef.current = toast({ title, description, status })
  }

  const handleDeleteNote = (id) => {
    addToast('Deleting Note', 'Removing the note from your database...', 'info')
    deleteNote(id)
      .then(() => {
        setNotesList((notesList) => notesList.filter((c) => c._id !== id));
        updateToast('Note successfully removed!', '', 'success', '1000', true)
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
      resetNotes();
    } else {
      const sortedList = notesList.filter((note) =>
        note.tags.find((tag) => tag.name == activeTag)
      );
      setNotesList(sortedList);
    }
  }, [activeTag]);

  return (
    <Skeleton isLoaded={isLoaded} fadeDuration={2}>
      <Wrap align="flex-start" justify="center" spacing="3vw" marginTop="3vh">
        {notesList.map((note) => (
          <WrapItem key={note._id} flexDirection="column" alignItems="Card">
            <Card
              boxSize="xs"
              borderRadius="5%"
              flexDirection="column"
              justifyContent="space-around"
              size="md"
              variant="elevated"
              bg={bg}
            >
              <CardHeader h="10%">
                <Heading noOfLines={1} fontSize="xl">
                  {note.title}
                </Heading>
              </CardHeader>
              <CardBody h="70%">
                <Text fontSize="sm" noOfLines={8}>
                  {note.body}
                </Text>
              </CardBody>
              <CardFooter h="20%">
                <HStack w="100%" justify="center">
                  <Link to={`/notes/${note._id}`}>
                    <EditIcon
                      color={edit}
                      boxSize={10}
                      w="50%"
                      _hover={{ color: "yellow.700" }}
                    />
                  </Link>
                  <Popover>
                    <PopoverTrigger>
                      <DeleteIcon
                        color={deleteColor}
                        boxSize={10}
                        w="50%"
                        _hover={{ cursor: "pointer", color: "red.700" }}
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
            {note.tags && (
              <HStack
                display="flex"
                align="center"
                justify="center"
                marginTop={1}
              >
                {note.tags.map((tag) => (
                  <Badge
                    variant={activeTag === tag.name ? "solid" : "outline"}
                    colorScheme={tag.color}
                    key={tag._id}
                    onClick={() => handleTagClick(tag.name)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </HStack>
            )}
          </WrapItem>
        ))}
        <WrapItem w="100%" display="flex" justifyContent="center">
          <Link to="/">
            <PlusSquareIcon
              boxSize={75}
              color="green.300"
              _hover={{ color: "green.500" }}
            />
          </Link>
        </WrapItem>
      </Wrap>
    </Skeleton>
  );
}

export default Notes;
