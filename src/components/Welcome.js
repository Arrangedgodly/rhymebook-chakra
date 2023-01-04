import { Button } from "@chakra-ui/react";

function Welcome({ handleNewUserClick, handleLoginClick }) {
  return (
    <div className="Welcome">
      <h1 className="Welcome-header">Welcome to Rhymebook!</h1>
      <p className="Welcome-subtext">
        Are you a{" "}
        <Button
          colorScheme="blue"
          size="lg"
          fontSize="1.5vw"
          onClick={handleNewUserClick}
        >
          New User
        </Button>{" "}
        or a{" "}
        <Button
          colorScheme="green"
          size="lg"
          fontSize="1.5vw"
          onClick={handleLoginClick}
        >
          Returning User
        </Button>
      </p>
    </div>
  );
}

export default Welcome;
