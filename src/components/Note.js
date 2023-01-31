import {
  Card,
  Heading,
  VStack,
  HStack,
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
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { BsPin, BsPinFill } from "react-icons/bs";
import { useState, useEffect } from "react";

function Note({
  note,
  activeTag,
  handleDeleteNote,
  handleTagClick,
  handleCardSelectChange,
  handlePinAdd,
  handlePinDelete,
  selectedNotes,
}) {
  const bg = useColorModeValue("gray.300", "gray.500");
  const edit = useColorModeValue("yellow.500", "yellow.300");
  const deleteColor = useColorModeValue("red.500", "red.300");
  const select = useColorModeValue("gray.50", "gray.900");

  const [cardSelected, setCardSelected] = useState(false);
  const [pinSelected, setPinSelected] = useState(note.pinned);

  const handleCardSelect = () => {
    setCardSelected(!cardSelected);
    handleCardSelectChange(note._id);
  };

  const handlePinSelect = () => {
    if (pinSelected) {
      handlePinDelete(note._id);
      setPinSelected(false);
    } else {
      handlePinAdd(note._id);
      setPinSelected(true);
    }
  };

  useEffect(() => {
    if (selectedNotes.includes(note._id)) {
      setCardSelected(true);
    }
  }, [selectedNotes]);

  return (
    <WrapItem key={note._id} flexDirection="column" alignItems="Card">
      <Card
        boxSize="xs"
        rounded="xl"
        flexDirection="column"
        justifyContent="space-around"
        size="md"
        variant="elevated"
        position="relative"
        bg={bg}
      >
        <Icon
          as={cardSelected ? FaCheckCircle : FaRegCheckCircle}
          position="absolute"
          top="1vh"
          left="1vh"
          onClick={handleCardSelect}
          boxSize={25}
          _hover={{ color: select }}
        />
        <Icon
          as={pinSelected ? BsPinFill : BsPin}
          position="absolute"
          top="1vh"
          right="1vh"
          boxSize={25}
          onClick={handlePinSelect}
          _hover={{ color: select }}
        />
        {note.title && (
          <CardHeader h="10%">
            <Heading noOfLines={1} fontSize="xl" maxW="90%" margin='auto'>
              {note.title}
            </Heading>
          </CardHeader>
        )}
        <CardBody h="70%">
          <Text fontSize="sm" noOfLines={8} maxW="90%" margin="auto">
            {note.body}
          </Text>
        </CardBody>
        <CardFooter h="20%" padding="2">
          <HStack w="100%" justify="center" margin="0">
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
          </HStack>
          <Text
            position="absolute"
            fontSize="xs"
            right="2"
            bottom="2"
            maxW="30%"
          >
            {note.lastEdited
              ? `Last Edited: ${new Date(note.lastEdited).toLocaleString(
                  "en-US",
                  { timeZone: "UTC" }
                )}`
              : `Created: ${new Date(note.created).toLocaleString(
                "en-US",
                { timeZone: "UTC" }
              )}`}
          </Text>
        </CardFooter>
      </Card>
      {note.tags && (
        <HStack display="flex" align="center" justify="center" marginTop={1}>
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
  );
}

export default Note;
