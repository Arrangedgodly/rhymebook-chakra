import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  RadioGroup,
  Radio,
  Badge,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

function Rhymetags({ isOpen, onClose }) {
  const [tag, setTag] = useState("");

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Note Tags</DrawerHeader>

        <DrawerBody>
          <Flex direction="column">
            <Input
              placeholder="Input a new tag here..."
              value={tag}
              onChange={handleTagChange}
            />
            <RadioGroup defaultValue="red">
              <HStack justify='center'>
                <Radio value="red">
                  <Badge colorScheme="red">{tag === '' ? 'Red' : tag}</Badge>
                </Radio>
                <Radio value="green">
                  <Badge colorScheme="green">{tag === '' ? 'Green' : tag}</Badge>
                </Radio>
                <Radio value="blue">
                  <Badge colorScheme="blue">{tag === '' ? 'Blue' : tag}</Badge>
                </Radio>
                <Radio value="orange">
                  <Badge colorScheme="orange">{tag === '' ? 'Orange' : tag}</Badge>
                </Radio>
                <Radio value="yellow">
                  <Badge colorScheme="yellow">{tag === '' ? 'Yellow' : tag}</Badge>
                </Radio>
                <Radio value="gray">
                  <Badge colorScheme="gray">{tag === '' ? 'Gray' : tag}</Badge>
                </Radio>
                <Radio value="teal">
                  <Badge colorScheme="teal">{tag === '' ? 'Teal' : tag}</Badge>
                </Radio>
                <Radio value="cyan">
                  <Badge colorScheme="cyan">{tag === '' ? 'Cyan' : tag}</Badge>
                </Radio>
                <Radio value="purple">
                  <Badge colorScheme="purple">{tag === '' ? 'Purple' : tag}</Badge>
                </Radio>
                <Radio value="pink">
                  <Badge colorScheme="pink">{tag === '' ? 'Pink' : tag}</Badge>
                </Radio>
              </HStack>
            </RadioGroup>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Rhymetags;
