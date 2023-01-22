import { DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  HStack,
  Badge,
  IconButton,
  flexbox,
} from "@chakra-ui/react";

function Rhymeinput({
  title,
  handleTitleChange,
  body,
  handleBodyChange,
  handleLastWordChange,
  onOpen,
  activeNote,
  handleDeleteNoteTag
}) {
  const bg = useColorModeValue("gray.300", "gray.700");

  return (
    <Flex direction="column" align="center" justify="center">
      <form className="Rhymebook-form">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            bg={bg}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Rhymes</FormLabel>
          <Textarea
            type="text"
            h={380}
            value={body}
            onChange={handleBodyChange}
            onKeyDown={handleLastWordChange}
            bg={bg}
          />
        </FormControl>
      </form>
      <HStack marginBottom="2vh">
        {activeNote.tags &&
          activeNote.tags.map((tag) => (
            <Badge
              colorScheme={tag.color}
              key={tag._id}
              display="flex"
              alignItems="center"
            >
              {tag.name}
              <DeleteIcon opacity='0' _hover={{ opacity: '100' }} onClick={() => handleDeleteNoteTag(activeNote._id, tag._id)} />
            </Badge>
          ))}
      </HStack>
      <Button onClick={onOpen} w={250}>
        Add Tags
      </Button>
    </Flex>
  );
}

export default Rhymeinput;
