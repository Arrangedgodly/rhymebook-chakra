import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button
} from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
const validator = require("validator");

function Login({ handleLogin }) {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [emailError, setEmailError] = useState(false);

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

 useEffect(() => {
  setEmailError(!validator.isEmail(email));
}, [email]);

  return (
      <form className="Form">
        <p className="Form-title">Welcome Back! Enter your credentials below:</p>
        <FormControl isRequired isInvalid={emailError}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
          <FormErrorMessage>Input must be an email address</FormErrorMessage>
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
        <p className="Form-subtext">
        Not an existing user? <Link to='/new-user' className='Form-link'>Create an account here!</Link>
        </p>
      </form>
  );
}

export default Login;
