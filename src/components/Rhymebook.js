import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  FormHelperText,
  Button
} from "@chakra-ui/react";

function Rhymebook() {
  return (
    <Flex className="Rhymebook" colorScheme='dark'>
      <form className="Rhymebook-form">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type='text' />
        </FormControl>
        <FormControl>
          <FormLabel>Rhymes</FormLabel>
          <Textarea type='text' h={500} />
        </FormControl>
      </form>
    </Flex>
  );
}

export default Rhymebook;