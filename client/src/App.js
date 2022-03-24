import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPass from "./pages/Reset/ResetPass";
import UserType from "./pages/Register/UserType";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import ManageUsers from "./pages/Admin/ManageUsers";

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
  const [isAdmin, setIsAdmin] = useState(true);

  const getUserCredentials = async () => {
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();
      setUsername(parseRes.uname);
      if (parseRes.utype === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  console.log(isAdmin);

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
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
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
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        <Route path="/register" element={<Register userType={userType} />} />
        <Route path="/resetpassword" element={<ResetPass />} />
        <Route
          path="/usertype"
          element={<UserType setUserType={setUserType} />}
        />
         <Route
          path="/manageusers"
          element={
            isAdmin? (
              <ManageUsers
                isAdmin={isAdmin}
              />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
