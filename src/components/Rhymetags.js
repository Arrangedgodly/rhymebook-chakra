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
  HStack
} from "@chakra-ui/react";
import { useState } from "react";

function Rhymetags({ isOpen, onClose, handleAddNoteTag }) {
  const [tag, setTag] = useState("");
  const [color, setColor] = useState('red');

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleTagSubmit = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
  }

  const handleSubmit = () => {
    handleAddNoteTag(tag, color);
    setTag('');
    setColor('red');
    onClose();
  }

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
              onKeyDown={handleTagSubmit}
            />
            <RadioGroup value={color} marginTop={2}>
              <HStack justify='center'>
                <Radio value="red" onChange={handleColorChange}>
                  <Badge colorScheme="red" variant={color === 'red' ? 'solid' : 'outline'}>Red</Badge>
                </Radio>
                <Radio value="green" onChange={handleColorChange}>
                  <Badge colorScheme="green" variant={color === 'green' ? 'solid' : 'outline'}>Green</Badge>
                </Radio>
                <Radio value="blue" onChange={handleColorChange}>
                  <Badge colorScheme="blue" variant={color === 'blue' ? 'solid' : 'outline'}>Blue</Badge>
                </Radio>
                <Radio value="orange" onChange={handleColorChange}>
                  <Badge colorScheme="orange" variant={color === 'orange' ? 'solid' : 'outline'}>Orange</Badge>
                </Radio>
                <Radio value="yellow" onChange={handleColorChange}>
                  <Badge colorScheme="yellow" variant={color === 'yellow' ? 'solid' : 'outline'}>Yellow</Badge>
                </Radio>
                <Radio value="gray" onChange={handleColorChange}>
                  <Badge colorScheme="gray" variant={color === 'gray' ? 'solid' : 'outline'}>Gray</Badge>
                </Radio>
                <Radio value="teal" onChange={handleColorChange}>
                  <Badge colorScheme="teal" variant={color === 'teal' ? 'solid' : 'outline'}>Teal</Badge>
                </Radio>
                <Radio value="cyan" onChange={handleColorChange}>
                  <Badge colorScheme="cyan" variant={color === 'cyan' ? 'solid' : 'outline'}>Cyan</Badge>
                </Radio>
                <Radio value="purple" onChange={handleColorChange}>
                  <Badge colorScheme="purple" variant={color === 'purple' ? 'solid' : 'outline'}>Purple</Badge>
                </Radio>
                <Radio value="pink" onChange={handleColorChange}>
                  <Badge colorScheme="pink" variant={color === 'pink' ? 'solid' : 'outline'}>Pink</Badge>
                </Radio>
              </HStack>
            </RadioGroup>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Rhymetags;
