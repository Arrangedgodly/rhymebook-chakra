import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NewUser({ handleCreateUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser(name, avatar, email, password);
  };

  return (
    <form className="Form">
      <p className="Form-title">Create a new Rhymebook Account</p>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={name} onChange={handleNameChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={handleEmailChange}/>
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
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <p className="Form-subtext">
        Already an existing user? <Link to='/login' className='Form-link'>Click Here!</Link>
      </p>
    </form>
  );
}

export default NewUser;
