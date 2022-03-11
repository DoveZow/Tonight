import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import "./Nav.css";
import NavDropDown from "./NavDropDown";
import AdminBadge from "./AdminBadge";

const NavUserCreds = ({
  username,
  setIsDropdownShown,
  isDropdownShown,
  isAuthenticated,
  isAdmin,
  setIsAdmin
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
      <AdminBadge isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </Fragment>
  );
};

export default NavUserCreds;
