import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPass from "./pages/Reset/ResetPass";
import UserType from "./pages/Register/UserType";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";

toast.configure();

function App() {
  const isUserAuthenticated = async () => {
    try {
      const response = await fetch("/verified", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    isUserAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");

  const getUserCredentials = async () => {
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();
      setUsername(parseRes.uname);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("UserType");
    if (data) {
      setUserType(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const stateInfo = JSON.stringify(userType);
    if (stateInfo) {
      localStorage.setItem("UserType", stateInfo);
    }
  });

  console.log(isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              setUsername={setUsername}
              username={username}
            />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
                username={username}
              />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register userType={userType} />} />
        <Route path="/resetpassword" element={<ResetPass />} />
        <Route
          path="/usertype"
          element={<UserType setUserType={setUserType} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
