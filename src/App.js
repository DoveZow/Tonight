import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPass from "./pages/Reset/ResetPass";

toast.configure();

function App() {
  const isUserAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:3002/verified", {
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

  console.log(isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Home
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<ResetPass />} />
      </Routes>
    </Router>
  );
}

export default App;
