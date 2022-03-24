import React, { Fragment } from "react";
import "./Nav.css";
import AdminBadge from "./AdminBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon
        className="text-white fa-angle-down"
        icon={faAngleDown}
      />
      <AdminBadge isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </Fragment>
  );
};

export default NavUserCreds;
