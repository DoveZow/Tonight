import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const [name, setName] = useState("");
  let navigate = useNavigate();


  const getUserCredentials = async () => {
    try {
      const response = await fetch("http://localhost:3002/", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();
      setName(parseRes.uname);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      toast.success("Logged out");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  return (
    <div className="outer-div center-content">
      <div className="inner-div center-content">
        <h2>
          Welcome to your home page, <span className="text-blue">{name}</span>.
        </h2>
        <button className="button" onClick={logout}>
          {" "}
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default Home;
