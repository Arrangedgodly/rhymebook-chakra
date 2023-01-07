import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button
} from "@chakra-ui/react";

function NewUser({ handleCreateUser }) {
  const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleEmailChange = (e) => {
  setEmail(e.target.value);
 }

 const handlePasswordChange = (e) => {
  setPassword(e.target.value);
 }
 
  const handleSubmit = (e) => {
    e.preventDefault();
  }

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
      <Button
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
}

export default NewUser;
