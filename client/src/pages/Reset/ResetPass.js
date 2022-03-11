import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ResetPassForm from "./ResetPassForm";
import "./ResetPass.css";

const ResetPass = () => {
  let navigate = useNavigate();
  return (
    <div className="auth-container center-content page-width page-height">
      <div className="card auth-card center-content">
        <section className="auth-credentials background-white center-content">
          <div className="auth-section-wrapper register-wrapper">
            <h2 className="text-align-left"> Reset password</h2>
            <ResetPassForm />
            <p className="text-bold text-align-right">
              Remembered?{" "}
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

export default ResetPass;
