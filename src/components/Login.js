import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

function Login() {
  return (
    <form className="Form">
      <p className="Form-title">Create a new Rhymebook Account</p>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input type="password" />
      </FormControl>
    </form>
  );
}

export default Login;
