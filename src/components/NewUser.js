import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const validator = require("validator");

function NewUser({ handleCreateUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [hidePasswords, setHidePasswords] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleHidePasswords = () => {
    setHidePasswords(!hidePasswords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      handleCreateUser(name, email, password);
    } else {
      setPasswordError(true);
    }
  };

  useEffect(() => {
    setEmailError(!validator.isEmail(email));
  }, [email]);

  useEffect(() => {
    setPasswordError(!(password === confirmPassword));
  }, [confirmPassword]);

  return (
    <form className="Form">
      <p className="Form-title">Create a new Rhymebook Account</p>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={name} onChange={handleNameChange} />
      </FormControl>
      <FormControl isInvalid={emailError}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={handleEmailChange} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl isInvalid={passwordError}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={hidePasswords ? "password" : "text"}
            value={password}
            onChange={handlePasswordChange}
          />
          <InputRightElement
            children={hidePasswords ? <ViewIcon /> : <ViewOffIcon />}
            onClick={handleHidePasswords}
          />
        </InputGroup>
      </FormControl>
      <FormControl isInvalid={passwordError}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={hidePasswords ? "password" : "text"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <InputRightElement
            children={hidePasswords ? <ViewIcon /> : <ViewOffIcon />}
            onClick={handleHidePasswords}
          />
        </InputGroup>
        <FormErrorMessage>
          Confirmation Password does not match
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <p className="Form-subtext">
        Already an existing user?{" "}
        <Link to="/login" className="Form-link">
          Click Here!
        </Link>
      </p>
    </form>
  );
}

export default NewUser;
