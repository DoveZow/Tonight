import React, { useState } from "react";

const RegisterForm = () => {
  // useState variables
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerValidationMsg, setRegisterValidationMsg] = useState("");

  // set useState variables to whatever user inputs
  const setRegisterEmailHandler = (e) => {
    setRegisterEmail(e.target.value);
    // when user types anything, set validation message to blank
    setRegisterValidationMsg("");
  };
  const setRegisterUsernameHandler = (e) => {
    setRegisterUsername(e.target.value);
    // when user types anything, set validation message to blank
    setRegisterValidationMsg("");
  };
  const setRegisterPasswordHandler = (e) => {
    setRegisterPassword(e.target.value);
    // when user types anything, set validation message to blank
    setRegisterValidationMsg("");
  };
  const setRegisterConfirmPasswordHandler = (e) => {
    setRegisterConfirmPassword(e.target.value);
    // when user types anything, set validation message to blank
    setRegisterValidationMsg("");
  };

  // when create account button is clicked...
  const newUserHandler = async (e) => {
    e.preventDefault();
    // Check if user filled all fields
    if (
      registerEmail !== "" &&
      registerUsername !== "" &&
      registerPassword !== "" &&
      registerConfirmPassword !== ""
    ) {
      try {
        const body = { registerEmail, registerUsername, registerPassword };
        await fetch("http://localhost:3002/createaccount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
      } catch (err) {
        console.error(err.message);
      }
      setRegisterValidationMsg("Account created.");
      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
    } else {
      setRegisterValidationMsg("Please fill in all required fields.");
    }
  };

  return (
    <div className="form-wrapper register-form-wrapper">
      <form>
        <input
          type="text"
          id="register-email"
          placeholder="Email*"
          value={registerEmail}
          onChange={setRegisterEmailHandler}
        ></input>
        <input
          type="text"
          id="register-username"
          placeholder="Username*"
          value={registerUsername}
          onChange={setRegisterUsernameHandler}
        ></input>
        <input
          type="password"
          id="register-password"
          placeholder="Password*"
          value={registerPassword}
          onChange={setRegisterPasswordHandler}
        ></input>
        <input
          type="password"
          id="register-confirm-password"
          placeholder="Re-type Password*"
          value={registerConfirmPassword}
          onChange={setRegisterConfirmPasswordHandler}
        ></input>
        <button
          className="button auth-button width-100 background-blue text-white text-bold"
          onClick={newUserHandler}
        >
          Create Account
        </button>
        <p className="register-validation-msg">{registerValidationMsg}</p>
      </form>
    </div>
  );
};

export default RegisterForm;
