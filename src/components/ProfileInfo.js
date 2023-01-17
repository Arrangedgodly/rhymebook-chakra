import {
  Flex,
  Editable,
  FormControl,
  FormLabel,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

function ProfileInfo({ currentUser }) {
  return (
    <Flex align="center" justify="center">
      <FormControl w="75vw">
        <Flex direction="column" align="center">
          <FormLabel fontSize="2xl">Username</FormLabel>
          <Editable defaultValue={currentUser.name} fontSize="lg">
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Flex>
        <Flex direction="column" align="center">
          <FormLabel fontSize="2xl">Avatar</FormLabel>
          <Editable
            defaultValue={currentUser.avatar}
            placeholder="Submit a URL for your Avatar"
            fontSize="lg"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Flex>
        <Flex direction="column" align="center">
          <FormLabel fontSize="2xl">Email</FormLabel>
          <Editable defaultValue={currentUser.email} fontSize="lg">
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Flex>
      </FormControl>
    </Flex>
  );
}

export default ProfileInfo;
