import {
  Flex,
  useColorMode,
  IconButton
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import AvatarButton from "./AvatarButton";

function Header({ loggedIn, currentUser, handleLogout }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Flex alignItems='center' justifyContent='center'>
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        />
        {loggedIn && <AvatarButton currentUser={currentUser} handleLogout={handleLogout} />}
      </Flex>
    </header>
  );
}

export default Header;
