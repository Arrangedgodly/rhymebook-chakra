import { Box, Image, Flex, useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import AvatarButton from "./AvatarButton";
import logo from "../images/rhymebook_logo.webp";
import { Link } from "react-router-dom";

function Header({ loggedIn, currentUser, handleLogout }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.400', 'gray.800');

  return (
    <header>
      <Flex alignItems="center" justifyContent="center" bg={bg}>
        <Link to='/'>
          <Image src={logo} className='Rhymebook-logo' />
        </Link>
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        />
        {loggedIn && (
          <AvatarButton currentUser={currentUser} handleLogout={handleLogout} />
        )}
      </Flex>
    </header>
  );
}

export default Header;
