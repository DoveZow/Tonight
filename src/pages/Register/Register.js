import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/tonight-logo.svg";
import illustration from "../../images/login-illustration.svg";
import RegisterForm from "./RegisterForm";
import "../Register/RegisterStyles.css";

// for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  let navigate = useNavigate();

  return (
    <div className="auth-container center-content page-width page-height">
      <div className="card auth-card center-content">
        <section className="auth-credentials background-white center-content">
          <div className="auth-section-wrapper register-wrapper">
            <h2 className="text-align-left"> Create an account</h2>
            <RegisterForm />
            <p className="text-bold text-align-right">
              Already registered?{" "}
              <span
                className="link text-blue"
                onClick={() => navigate("/login")}
              >
                Login now
                {/* Arrow icon */}
                <FontAwesomeIcon
                  className="fa-arrow-right"
                  icon={faArrowRight}
                />
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
