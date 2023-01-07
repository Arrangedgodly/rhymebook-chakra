import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button
} from "@chakra-ui/react";
import { useState } from 'react';


function Login({ handleLogin }) {
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
  handleLogin(email, password);
 }

  return (
      <form className="Form">
        <p className="Form-title">Welcome Back! Enter your credentials below:</p>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={handlePasswordChange} />
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
