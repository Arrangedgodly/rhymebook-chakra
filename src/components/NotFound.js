import {
  Flex,
  Heading,
  useColorModeValue,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function NotFound() {
  const bg = useColorModeValue("gray.400", "gray.800");

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="93vh"
      bg={bg}
      gap="10"
    >
      <Heading size="4xl" maxW="80%">
        404: Page Not Found <WarningIcon />
      </Heading>
      <Text fontSize="3xl" maxW="70%">
        Looks like we haven't developed this corner of the site quite yet. Let's
        get you back to safety.
      </Text>
      <Breadcrumb fontSize='3xl' fontStyle='italic'>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/notes">
            Notebook
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/notes/new">
            New Note
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='/profile'>Profile</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}

export default NotFound;
