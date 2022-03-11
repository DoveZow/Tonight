import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const UserType = ({ setUserType }) => {
  let navigate = useNavigate();
  const setPhotographerHandler = () => {
    setUserType("photographer");
    navigate("/register");
  };
  const setEnthusiastHandler = () => {
    setUserType("enthusiast");
    navigate("/register");
  };
  const setStudentHandler = () => {
    setUserType("student");
    navigate("/register");
  };

 

  return (
    <Fragment>
      <div className="auth-container center-content page-width page-height">
        <div className="user-types-wrapper">
          <h2 className="text-white user-types-heading">
            {" "}
            Which one best describes you?
          </h2>
          <div className="user-types-containter center-content">
            <div
              className="user-type user-general"
              onClick={setPhotographerHandler}
            >
              Photographer
            </div>
            <div
              className="user-type user-photographer "
              onClick={setEnthusiastHandler}
            >
              Enthusiast
            </div>
            <div
              className="user-type user-enthusiast"
              onClick={setStudentHandler}
            >
              Student
            </div>
          </div>
          <p className="text-white text-bold" onClick={() => navigate("/login")}>
            <FontAwesomeIcon
              className="fa-arrow-left-long"
              icon={faArrowLeftLong}
            />{" "}
            Go back
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default UserType;
