import { Heading, Center, Button, Box, useColorModeValue, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Welcome({ handleButtonClick }) {
  const bg = useColorModeValue("gray.400", "gray.800");
  const box = useColorModeValue("gray.300", "gray.500");
  const text = useColorModeValue('gray.900', 'gray.50');

  return (
    <Box className="Welcome" bg={bg}>
      <Center bg={box} rounded='xl' minH='75vh' minW='60vw' flexDirection='column' rowGap='6vh'>
      <Heading fontSize='6xl' color={text}>Welcome to Rhymebook!</Heading>
      <Text fontSize='4xl' color={text} maxW='50%'>
        The API powered notebook that writes your rhymes (and much more) with you!
      </Text>
      <Text fontSize='2xl' color={text}>
        Are you a{" "}
        <Link to='/new-user'>
        <Button
          colorScheme="blue"
          size="lg"
          fontSize="1.5vw"
          onClick={handleButtonClick}
        >
          New User
        </Button>
        </Link>
        {" "}
        or a{" "}
        <Link to='/login'>
        <Button
          colorScheme="green"
          size="lg"
          fontSize="1.5vw"
          onClick={handleButtonClick}
        >
          Returning User
        </Button>
        </Link>
        {" "}?
      </Text>
      </Center>
    </Box>
  );
}

export default Welcome;
