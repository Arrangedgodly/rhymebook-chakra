import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

function NewUser() {
  return (
    <form className="Form">
      <p className="Form-title">Welcome Back! Enter your credentials below:</p>
      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
    </form>
  );
}

export default NewUser;
