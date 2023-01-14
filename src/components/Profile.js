import { Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import ProfileInfo from "./ProfileInfo";
import Preferences from "./Preferences";

function Profile({ currentUser }) {
  return (
      <Tabs variant='enclosed' align='center'>
        <TabList>
          <Tab>My Information</Tab>
          <Tab>Preferences</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProfileInfo currentUser={currentUser}/>
          </TabPanel>
          <TabPanel>
            <Preferences currentUser={currentUser}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
  );
}

export default Profile;