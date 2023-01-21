import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  HStack
} from "@chakra-ui/react";

function Rhymeinput({ title, handleTitleChange, body, handleBodyChange, handleLastWordChange, onOpen }) {
  const bg = useColorModeValue('gray.300', 'gray.700');

  return (
    <Flex direction='column' align='center' justify='center'>
      <form className="Rhymebook-form">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={handleTitleChange} bg={bg} />
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
      <HStack>
        
      </HStack>
      <Button
        onClick={onOpen}
        w={250}
      >
        Add Tags
      </Button>
    </Flex>
  );
}

export default Rhymeinput;
