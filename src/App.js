import Header from "./components/Header";
import Welcome from "./components/Welcome";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import Loading from "./components/Loading";
import Rhymebook from "./components/Rhymebook";
import { useState, useEffect } from "react";
import { login, checkAuth, createUser } from './utils/api';

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

  const handleCreateUser = (name, avatar, email, password) => {
    createUser(name, avatar, email, password)
      .then(res => {
        handleLogin(res.email, password);
      })
      .catch(err => console.log(err));
  }

  const handleLogin = (email, password) => {
    login(email, password)
      .then(res => {
        localStorage.setItem("jwt", res.token);
        handleAuth();
      })
      .catch(err => console.log(err))
  };

  const handleAuth = () => {
    setIsLoading(true);
    checkAuth(localStorage.getItem('jwt'))
      .then(user => {
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user);
          setActivePage('rhymebook');
        } else {
          setLoggedIn(false);
          setCurrentUser({});
        }
      })
      .catch(err => console.log(err))
  }

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    setActivePage('welcome');
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 250)
  }, [isLoading])

  useEffect(() => {
    handleAuth()
  }, [])

  return (
    <>
    <Header 
      loggedIn={loggedIn}
      currentUser={currentUser}
      handleLogout={handleLogout}
    />
    <div className="App">
      {isLoading && <Loading />}
      {activePage === "welcome" && (
        <Welcome
          handleNewUserClick={handleNewUserClick}
          handleLoginClick={handleLoginClick}
        />
      )}
      {activePage === "newuser" && <NewUser handleCreateUser={handleCreateUser}/>}
      {activePage === "login" && <Login handleLogin={handleLogin}/>}
      {activePage === 'rhymebook' && <Rhymebook />}
    </div>
    </>
  );
}

export default App;
