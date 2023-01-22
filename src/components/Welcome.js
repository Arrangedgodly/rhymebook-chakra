import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Welcome({ handleButtonClick }) {
  return (
    <Box className="Welcome">
      <h1 className="Welcome-header">Welcome to Rhymebook!</h1>
      <p className="Welcome-text">
        The API powered notebook that writes your rhymes (and much more) with you!
      </p>
      <p className="Welcome-subtext">
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
      </p>
    </Box>
  );
}

export default Welcome;
