import React from "react";
import { useNavigate } from "react-router-dom";
// for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "../Login/LoginStyles.css";
import logo from "../../images/tonight-logo.svg";
import illustration from "../../images/login-illustration.svg";

// import components
import LoginForm from "./LoginForm";

const Login = ({ setIsAuthenticated, isAuthenticated }) => {
  let navigate = useNavigate();
  return (
    <div className="auth-container center-content page-width page-height">
      <div className="card auth-card center-content">
        <section className="auth-credentials background-white center-content">
          <div className="auth-section-wrapper">
            <img className="auth-logo" src={logo} alt="logo" />
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
            <p className="link text-bold text-align-right">
              Not registered yet?{" "}
              <span className="text-blue" onClick={() => navigate("/usertype")}>
                Sign up
                {/* Arrow icon */}
                <FontAwesomeIcon
                  className="fa-arrow-right"
                  icon={faArrowRight}
                />
              </span>
            </p>
          </div>
        </section>
        <section className="auth-illustration center-content">
          <img
            className="auth-illustration-image"
            src={illustration}
            alt="illustration"
          />
        </section>
      </div>
    </div>
  );
};

export default Login;
