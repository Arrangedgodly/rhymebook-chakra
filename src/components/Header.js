import { Box, Image, Flex, useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import AvatarButton from "./AvatarButton";
import logo from "../images/rhymebook_logo.webp";
import { Link } from "react-router-dom";

function Header({ loggedIn, currentUser, handleLogout }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Flex alignItems="center" justifyContent="center">
        <Link to={loggedIn ? '/create-note' : '/'}>
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
