import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
