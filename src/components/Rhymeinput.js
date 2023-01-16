import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue
} from "@chakra-ui/react";

function Rhymeinput({ title, handleTitleChange, body, handleBodyChange, handleLastWordChange }) {
  const bg = useColorModeValue('gray.300', 'gray.700');

  return (
    <Flex className="Rhymebook">
      <form className="Rhymebook-form">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={handleTitleChange} bg={bg} />
        </FormControl>
        <FormControl>
          <FormLabel>Rhymes</FormLabel>
          <Textarea
            type="text"
            h={500}
            value={body}
            onChange={handleBodyChange}
            bg={bg}
          />
        </FormControl>
      </form>
    </Flex>
  );
}

export default Rhymeinput;
