import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button
} from "@chakra-ui/react";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

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
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
  );
}

export default Login;
