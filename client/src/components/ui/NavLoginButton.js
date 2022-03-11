import React from "react";
import { useNavigate } from "react-router-dom";

const NavLoginButton = ({ isAuthenticated }) => {
  let navigate = useNavigate();

  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="nav-button-list">
      <button
        className="button nav-login-button background-blue text-white text-bold"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default NavLoginButton;
