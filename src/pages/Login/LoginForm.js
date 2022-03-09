import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()


  async function handleLogin(e){
    e.preventDefault()
    
    try{
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to login.")
    }
    setLoading(false)
  } 

  return (
    <div className="form-wrapper">
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          id="email" 
          ref={emailRef} 
          placeholder="Email"
        ></input>
        <input 
          type="password" 
          id="password" 
          ref={passwordRef} 
          placeholder="Password"
          ></input>
        <button className="button auth-button width-100 background-blue text-white text-bold">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
