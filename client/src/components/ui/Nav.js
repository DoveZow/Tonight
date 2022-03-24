import React, { useState, Fragment } from "react";
import "../ui/Nav.css";
import { useNavigate } from "react-router-dom";
import logo from "../../images/tonight-logo-white.svg";
import NavLoginButton from "./NavLoginButton";
import NavUserCreds from "./NavUserCreds";
import NavDropDown from "./NavDropDown";

const Nav = ({
  isAuthenticated,
  setIsAuthenticated,
  username,
  setUsername,
  isAdmin,
  setIsAdmin
}) => {
  let navigate = useNavigate();

  const [isDropdownShown, setIsDropdownShown] = useState(false);
  return (
    <Fragment>
      <div className="nav-container">
        <nav className="vertical-center global-width">
          <div className="nav-logo-container">
            <img src={logo} />
          </div>
          <div className="nav-search">
            <input className="nav-search-input" placeholder="Search" />
          </div>
          <div className="nav-links">
            <ul>
              {/* <li>About</li>
              <li>Link</li>
              <li>Link</li> */}
            </ul>
          </div>
          <NavLoginButton isAuthenticated={isAuthenticated} />
          <NavUserCreds
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            username={username}
            setUsername={setUsername}
            setIsDropdownShown={setIsDropdownShown}
            isDropdownShown={isDropdownShown}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        </nav>
        <NavDropDown
          isDropdownShown={isDropdownShown}
          setIsAuthenticated={setIsAuthenticated}
          setIsDropdownShown={setIsDropdownShown}
          setIsAdmin={setIsAdmin}
        />
      </div>
    </Fragment>
  );
};

export default Nav;
