import React from "react";
import { useRef, useState, useEffect } from 'react';
const LoginForm = () => {
  //march 5 18:26-----------------------------------------
  // type code here for login validation
  const userRef = useRef();
  const errRef = useRef();

  return (
    <div className="form-wrapper">
      <form>
        <input type="text" name="uname" id="username" placeholder="Username"></input>
        <input type="password" name="pass" id="password" placeholder="Password"></input>
        <button className="button auth-button width-100 background-blue text-white text-bold">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
