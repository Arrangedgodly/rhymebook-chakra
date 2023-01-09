import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

function Rhymeinput({ title, handleTitleChange, body, handleBodyChange }) {
  return (
    <Flex className="Rhymebook">
      <form className="Rhymebook-form">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={handleTitleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Rhymes</FormLabel>
          <Textarea
            type="text"
            h={500}
            value={body}
            onChange={handleBodyChange}
          />
        </FormControl>
      </form>
    </Flex>
  );
}

export default Rhymeinput;
