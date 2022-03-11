import React, { Fragment, useState, useEffect } from "react";
import "../Main/Main.css";
import { useNavigate } from "react-router-dom";
import logo from "../../images/tonight-logo.svg";
import Nav from "../../components/ui/Nav";
import Hero from "../../components/ui/Hero";
import { toast } from "react-toastify";

const Main = ({
  isAuthenticated,
  setIsAuthenticated,
  username,
  setUsername,
  isAdmin,
  setIsAdmin
}) => {
  const getUserCredentials = async () => {
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();
      setUsername(parseRes.uname);
      if (parseRes.utype === "admin") {
        toast.success("You're an admin");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  let navigate = useNavigate();
  return (
    <Fragment>
      <Nav
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setUsername={setUsername}
        username={username}
      />
      <Hero username={username} isAuthenticated={isAuthenticated} />
    </Fragment>
  );
};

export default Main;
