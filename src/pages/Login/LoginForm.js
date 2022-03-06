import React from "react";

const LoginForm = () => {
  // type code here for login validation


  return (
    <div className="form-wrapper">
      <form>
        <input type="text" id="username" placeholder="Username"></input>
        <input type="password" id="password" placeholder="Password"></input>
        <button className="button auth-button width-100 background-blue text-white text-bold">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
