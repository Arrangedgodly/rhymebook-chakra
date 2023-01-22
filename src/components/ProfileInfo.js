import {
  Flex,
  Editable,
  FormControl,
  FormLabel,
  EditableInput,
  EditablePreview,
  Button
} from "@chakra-ui/react";
import { updateInfo } from "../utils/api";
import { useState } from "react";

function ProfileInfo({ currentUser, handleAuth }) {
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [email, setEmail] = useState(currentUser.email);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfo(name, avatar, email)
      .then(() => {
        handleAuth()
      })
      .catch(err => console.log(err))
  }

  return (
    <Flex align="center" justify="center">
      <FormControl w="75vw">
        <Flex direction="column" align="center">
          <FormLabel fontSize="2xl">Username</FormLabel>
          <Editable defaultValue={name} fontSize="lg">
            <EditablePreview />
            <EditableInput onChange={handleNameChange} />
          </Editable>
        </Flex>
        <Flex direction="column" align="center">
          <FormLabel fontSize="2xl">Avatar</FormLabel>
          <Editable
            defaultValue={avatar}
            placeholder="Submit a URL for your Avatar"
            fontSize="lg"
            maxW='50%'
          >
            <EditablePreview />
            <EditableInput  onChange={handleAvatarChange} />
          </Editable>
        </Flex>
        <Flex direction="column" align="center">
          <FormLabel fontSize="2xl">Email</FormLabel>
          <Editable defaultValue={email} fontSize="lg">
            <EditablePreview />
            <EditableInput onChange={handleEmailChange} />
          </Editable>
        </Flex>
        <Button type="button" marginTop='2vh' colorScheme='green' onClick={handleSubmit}>Submit Changes</Button>
      </FormControl>
    </Flex>
  );
}

export default ProfileInfo;
