import React from "react";
import "./Nav.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavDropDown = ({
  isDropdownShown,
  setIsAuthenticated,
  setIsDropdownShown
}) => {
  if (!isDropdownShown) {
    return null;
  }

  let navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      toast.success("Logged out");
      setIsDropdownShown(false);
    } catch (err) {
      console.error(err.message);
    }
  };
    
  return (
    <div className="nav-dropdown-container">
      <div className="nav-dropdown-wrapper">
        <div className="dropdown">
          <ul>
            <li onClick={() => navigate("/profile")}>Your Profile</li>
            <li>Your Favourites</li>
            <li className="logout" onClick={logout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavDropDown;
