import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

// import pages
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Search from "../pages/Home/Search";
import { useAuth } from "../contexts/AuthContext";
import About from "../pages/Home/About"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/about" element={<About/>} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
