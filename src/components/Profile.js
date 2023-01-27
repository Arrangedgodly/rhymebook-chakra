import {
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  useColorModeValue,
} from "@chakra-ui/react";
import ProfileInfo from "./ProfileInfo";
import Preferences from "./Preferences";
import { useEffect } from "react";

function Profile({ currentUser, handleAuth }) {
  const bg = useColorModeValue("gray.400", "gray.800");
  const panels = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (!currentUser) {
      handleAuth();
    }
  }, []);

  return (
    <Tabs variant="unstyled" align="center" bg={bg} minH="90vh">
      <TabList>
        <Tab roundedTop="lg" _selected={{ bg: panels }}>
          My Information
        </Tab>
        <Tab roundedTop="lg" _selected={{ bg: panels }}>
          Preferences
        </Tab>
      </TabList>

      <TabPanels bg={panels} rounded="xl" maxW="65vw">
        <TabPanel>
          <ProfileInfo currentUser={currentUser} handleAuth={handleAuth} />
        </TabPanel>
        <TabPanel>
          <Preferences currentUser={currentUser} handleAuth={handleAuth} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Profile;
