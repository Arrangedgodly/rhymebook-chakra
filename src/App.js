import Welcome from "./components/Welcome";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import Loading from "./components/Loading";
import { useState, useEffect } from "react";

function App() {
  const [activePage, setActivePage] = useState("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleNewUserClick = () => {
    setIsLoading(true);
    setActivePage("newuser");
  };

  const handleLoginClick = () => {
    setIsLoading(true);
    setActivePage("login");
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 250)
  }, [isLoading])

  return (
    <div className="App">
      {isLoading && <Loading />}
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
