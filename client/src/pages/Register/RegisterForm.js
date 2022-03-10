import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  let navigate = useNavigate();
  // useState variables
  const [registerEmail, setRegisterEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  
  const setRegisterEmailHandler = (e) => {
    setRegisterEmail(e.target.value);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    // when user types anything, set validation message to blank
  };

  const setRegisterUsernameHandler = (e) => {
    setRegisterUsername(e.target.value);
    // when user types anything, set validation message to blank
  };
  const setRegisterPasswordHandler = (e) => {
    setRegisterPassword(e.target.value);
    // when user types anything, set validation message to blank
  };
  const setRegisterConfirmPasswordHandler = (e) => {
    setRegisterConfirmPassword(e.target.value);
    // when user types anything, set validation message to blank
  };

  // when create account button is clicked...
  const newUserHandler = async (e) => {
    e.preventDefault();
    // Check if user filled all fields
    if (registerPassword !== registerConfirmPassword) {
      toast.error("Passwords don't match.");
    } else if (
      registerEmail !== "" &&
      registerUsername !== "" &&
      registerPassword !== "" &&
      registerConfirmPassword !== "" &&
      isEmailValid === true
    ) {
      try {
        const body = { registerEmail, registerUsername, registerPassword };
        const response = await fetch("http://localhost:3002/createaccount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const parseRes = await response.json();

        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          navigate("/");
          toast.success("Registered successfully");
        }
      } catch (err) {
        console.error(err.message);
        toast.error("Email or username already exists.");
      }

      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
    } else if (
      isEmailValid === false &&
      registerEmail !== "" &&
      registerUsername !== "" &&
      registerPassword !== "" &&
      registerConfirmPassword !== ""
    ) {
      toast.error("Invalid email");
    } else {
      toast.error("Please fill in all fields.");
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
      </form>
    </div>
  );
};

export default RegisterForm;
