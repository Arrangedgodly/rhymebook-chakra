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
    <Flex align='center' justify='center'>
      <FormControl w='35vw'>
        <FormLabel fontSize='2xl'>Username</FormLabel>
        <Editable defaultValue={currentUser.name} fontSize='lg'>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </FormControl>
    </Flex>
  );
}

export default ProfileInfo;
