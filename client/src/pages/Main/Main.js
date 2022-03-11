import React, { Fragment, useState, useEffect } from "react";
import "../Main/Main.css";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/ui/Nav";
import Hero from "../../components/ui/Hero";

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
        setIsAdmin(true);
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
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <Hero username={username} isAuthenticated={isAuthenticated} />
    </Fragment>
  );
};

export default Main;
