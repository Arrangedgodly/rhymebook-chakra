import Welcome from "./components/Welcome";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("welcome");

  const handleNewUserClick = () => {
    setActivePage("newuser");
  };

  const handleLoginClick = () => {
    setActivePage("login");
  };

  return (
    <div className="App">
      {activePage === "welcome" && (
        <Welcome
          handleNewUserClick={handleNewUserClick}
          handleLoginClick={handleLoginClick}
        />
      )}
      {activePage === "newuser" && <NewUser />}
      {activePage === "login" && <Login />}
    </div>
  );
}

export default App;
