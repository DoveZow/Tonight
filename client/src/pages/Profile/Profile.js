import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ isAuthenticated, username }) => {
  return (
    <div className="profile-page center-content width-100">
      This is
      <span className="text-bold"> &nbsp;{username}'s&nbsp;</span>
      profile page.
    </div>
  );
};

export default Profile;
