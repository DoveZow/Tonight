import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap";

const RegisterForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usrName, setUsrName] = useState('');
  const [usrEmail, setUsrEmail] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();
    //error checking before signup
    if (passwordRef.current.value != passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      const body = {
        usrName, usrEmail
      }
      await fetch("http://localhost:3002/createaccount", {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="form-wrapper register-form-wrapper">
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <input
          name="uemail"
          type="text"
          id="register-email"
          placeholder="Email*"
          ref={emailRef}
          onChange = {(e)=>setUsrEmail(e.target.value)}
        ></input>
        <input
          type="text"
          name="uname"
          id="register-username"
          placeholder="Username*"
          ref={usernameRef}
          onChange = {(e)=>setUsrName(e.target.value)}
        ></input>
        <input
          type="password"
          name="upass"
          id="register-password"
          placeholder="Password*"
          ref={passwordRef}
        ></input>
        <input
          type="password"
          name="upass-re"
          id="register-confirm-password"
          placeholder="Re-type Password*"
          ref={passwordConfirmRef}
        ></input>
        <button
          disabled={loading}
          className="button auth-button width-100 background-blue text-white text-bold"
          id="submit_button"
          onClick={handleSubmit}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
