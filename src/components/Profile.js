import { Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import ProfileInfo from "./ProfileInfo";
import Preferences from "./Preferences";

function Profile({ currentUser, handleAuth }) {
  return (
      <Tabs variant='enclosed' align='center'>
        <TabList>
          <Tab>My Information</Tab>
          <Tab>Preferences</Tab>
        </TabList>

        <TabPanels>
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