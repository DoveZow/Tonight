import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import "../Register/RegisterStyles.css";

// for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const Register = ({ userType }) => {
  let navigate = useNavigate();

  return (
    <Fragment>
      <div className="auth-container center-content page-width page-height">
        <div className="card auth-card center-content">
          <section className="auth-credentials background-white center-content">
            <div className="auth-section-wrapper register-wrapper">
              <h2 className="text-align-left"> Sign up</h2>
              <p className="text-align-left text-gray">
                User type set to: <span className="text-bold ">{userType}</span>
                &nbsp;
                <span
                  className="change-text text-blue"
                  onClick={() => navigate("/usertype")}
                >
                  change
                </span>
              </p>
              <RegisterForm userType={userType} />
              <p className="text-bold text-align-right">
                Already registered?{" "}
                <span className="link text-blue" onClick={() => navigate("/login")}>
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
    </Fragment>
  );
};

export default Register;
