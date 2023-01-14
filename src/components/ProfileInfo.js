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
    <FormControl>
      <FormLabel>Username</FormLabel>
      <Editable defaultValue={currentUser.name}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </FormControl>
  );
}

export default ProfileInfo;
