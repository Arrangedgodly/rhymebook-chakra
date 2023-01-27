import {
  Card,
  Heading,
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function Note({ note, activeTag, handleDeleteNote, handleTagClick }) {
  const bg = useColorModeValue("gray.300", "gray.500");
  const edit = useColorModeValue("yellow.500", "yellow.300");
  const deleteColor = useColorModeValue("red.500", "red.300");
  return (
    <WrapItem key={note._id} flexDirection="column" alignItems="Card">
      <Card
        boxSize="xs"
        rounded='xl'
        flexDirection="column"
        justifyContent="space-around"
        size="md"
        variant="elevated"
        bg={bg}
      >
        {note.title && (
          <CardHeader h="10%">
            <Heading noOfLines={1} fontSize="xl">
              {note.title}
            </Heading>
          </CardHeader>
        )}
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
