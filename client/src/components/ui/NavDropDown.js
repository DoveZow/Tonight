import React from "react";
import "./Nav.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavDropDown = ({
  isDropdownShown,
  setIsAuthenticated,
  setIsDropdownShown,
  setIsAdmin
}) => {
  let navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setIsAdmin(false);
      toast.success("Logged out");
      setIsDropdownShown(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // if (!isDropdownShown) {
  //   return null;
  // }

  const mouseLeaveHandler = () => {
    setIsDropdownShown(false);
  };

  return (
    <div className="nav-dropdown-container global-width">
      <div
        className={
          isDropdownShown
            ? "nav-dropdown-wrapper dropdown-open"
            : "nav-dropdown-wrapper dropdown-close"
        }
      >
        <div className="dropdown" onMouseLeave={mouseLeaveHandler}>
          <ul>
            <li onClick={() => navigate("/profile")}>
              {" "}
              {/* <FontAwesomeIcon className="fa-dropdown" icon={faUserAstronaut} /> */}
              Your Profile
            </li>
            <li>
              {" "}
              {/* <FontAwesomeIcon className="fa-dropdown" icon={faHeart} /> */}
              Your Favourites
            </li>
            <li className="dropdown-divider"></li>
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
