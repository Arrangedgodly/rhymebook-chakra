import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function AvatarButton({ currentUser, handleLogout }) {
  return (
    <Menu>
      <MenuButton>
        <Avatar
          name={currentUser.name}
          src={currentUser.avatar}
          size="lg"
          marginLeft="3"
        />
      </MenuButton>
      <MenuList>
        <Link to="/">
          <MenuItem>New Note</MenuItem>
        </Link>
        <Link to="/notes">
          <MenuItem>My Notebook</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default AvatarButton;
