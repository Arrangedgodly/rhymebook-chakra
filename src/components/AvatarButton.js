import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";

function AvatarButton({ currentUser, handleLogout }) {
  return (
    <Menu>
      <MenuButton>
        <Avatar name={currentUser.name} src={currentUser.avatar} />
      </MenuButton>
      <MenuList>
        <MenuItem>My Notes</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default AvatarButton;
