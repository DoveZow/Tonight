import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap"
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterForm = () => {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const usernameRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    //error checking before signup
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
    {
      return setError("Passwords do not match")
    }
    
    setError("")
    setLoading(true)
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        // signs in automatically
        const user = userCredential.user;
      })
      .catch((error) => {
        setError("Failed to create an account")
        console.log(error)
      });

    setLoading(false)
  }

  return (
    <div className="form-wrapper register-form-wrapper">
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="register-email"
          placeholder="Email*"
          ref={emailRef}
        ></input>
        <input
          type="text"
          id="register-username"
          placeholder="Username*"
          ref={usernameRef}
        ></input>
        <input
          type="password"
          id="register-password"
          placeholder="Password*"
          ref={passwordRef}
        ></input>
        <input
          type="password"
          id="register-confirm-password"
          placeholder="Re-type Password*"
          ref={passwordConfirmRef}
        ></input>
        <button
          disabled={loading}
          className="button auth-button width-100 background-blue text-white text-bold"
          id="submit_button"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
