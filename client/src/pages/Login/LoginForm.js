import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({ setIsAuthenticated }) => {
  let navigate = useNavigate();
  // type code here for login validation
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const setLoginUsernameHandler = (e) => {
    setLoginUsername(e.target.value);
  };

  const setLoginPasswordHandler = (e) => {
    setLoginPassword(e.target.value);
  };

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    if (loginUsername !== "" && loginPassword !== "") {
      try {
        const body = { loginUsername, loginPassword };
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        });

        const parseRes = await response.json();

        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          setIsAuthenticated(true);
          navigate("/dashboard");
        } else {
          setIsAuthenticated(false);
          toast.error("Username or password is incorrect.");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setIsAuthenticated(false);
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="form-wrapper">
      <form>
        <input
          type="text"
          id="username"
          placeholder="Username"
          onChange={setLoginUsernameHandler}
        ></input>
        <p
          className="forgot-pass text-blue"
          onClick={() => navigate("/resetpassword")}
        >
          Forgot password?{" "}
        </p>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={setLoginPasswordHandler}
        ></input>
        <button
          className="button auth-button width-100 background-blue text-white text-bold"
          onClick={submitLoginHandler}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
