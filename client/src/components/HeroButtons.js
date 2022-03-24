import React from "react";
import { useNavigate } from "react-router-dom";

const HeroButtons = ({ isAdmin }) => {
  let navigate = useNavigate();
  if (!isAdmin) {
    return null;
  }
  return (
    <div>
      <button
        className="button text-bold background-blue text-white"
        onClick={() => navigate("/manageusers")}
      >
        MANAGE SITE USERS
      </button>
    </div>
  );
};

export default HeroButtons;
