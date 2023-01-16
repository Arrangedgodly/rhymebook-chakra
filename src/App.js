import Header from "./components/Header";
import Welcome from "./components/Welcome";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import Loading from "./components/Loading";
import Rhymebook from "./components/Rhymebook";
import Notes from "./components/Notes";
import Profile from "./components/Profile";
import { useState, useEffect } from "react";
import { login, checkAuth, createUser } from "./utils/api";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsLoading(true);
  };

  const handleCreateUser = (name, avatar, email, password) => {
    createUser(name, avatar, email, password)
      .then((res) => {
        handleLogin(res.email, password);
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (email, password) => {
    login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        handleAuth();
      })
      .catch((err) => console.log(err));
  };

  const handleAuth = () => {
    setIsLoading(true);
    checkAuth(localStorage.getItem("jwt"))
      .then((user) => {
        if (user) {
          setLoggedIn(true);
          setCurrentUser(user);
        } else {
          setLoggedIn(false);
          setCurrentUser({});
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 250);
  }, [isLoading]);

  useEffect(() => {
    handleAuth();
  }, []);

  useEffect(() => {
    navigate("/");
  }, [loggedIn]);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <div className="App">
        {isLoading && <Loading />}
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Rhymebook currentUser={currentUser} />
              ) : (
                <Welcome handleButtonClick={handleButtonClick} />
              )
            }
          />
          <Route
            path="/new-user"
            element={<NewUser handleCreateUser={handleCreateUser} />}
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/notes" element={<Notes />} />
          <Route
            path="/profile"
            element={<Profile currentUser={currentUser} handleAuth={handleAuth} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
