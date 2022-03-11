import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import "./Nav.css";
import NavDropDown from "./NavDropDown";

const NavUserCreds = ({
  setIsAuthenticated,
  username,
  setUsername,
  setIsDropdownShown,
  isDropdownShown,
  isAuthenticated
}) => {
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Fragment>
      <div className="user-cred text-white">{username}</div>
      <div
        className="profile-pic"
        onClick={() => setIsDropdownShown(!isDropdownShown)}
      ></div>
    </Fragment>
  );
};

export default NavUserCreds;
