import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddUser = ({ isAddUser, setIsAddUser }) => {
  if (!isAddUser) {
    return null;
  }

  const [registerEmail, setRegisterEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userType, setUserType] = useState("admin");

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

  const setUserTypeHandler = (e) => {
    setUserType(e.target.value);
  };

  const newUserHandler = async (e) => {
    e.preventDefault();

    setIsAddUser(false);
    // Check if user filled all fields
    if (
      registerEmail !== "" &&
      registerUsername !== "" &&
      registerPassword !== "" &&
      isEmailValid === true
    ) {
      try {
        const body = {
          registerEmail,
          registerUsername,
          registerPassword,
          userType
        };
        const response = await fetch("/createaccount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const parseRes = await response.json();

        if (parseRes.token) {
          //   localStorage.setItem("token", parseRes.token);
          toast.success("Registered successfully");
          window.location.reload(false);
        }
      } catch (err) {
        console.error(err.message);
        toast.error("Email or username already exists.");
      }

      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
    } else if (
      isEmailValid === false &&
      registerEmail !== "" &&
      registerUsername !== "" &&
      registerPassword !== ""
    ) {
      toast.error("Invalid email format");
      setIsAddUser(true);
    } else {
      toast.error("Please fill in all fields.");
      setIsAddUser(true);
    }
  };

  return (
    <div className="center-content modal-background">
      <div className="modal-card add-user-card">
        <h4>
          Add a user
          <br />
        </h4>
        <form>
          <input
            placeholder="Username"
            onChange={setRegisterUsernameHandler}
          ></input>
          <input placeholder="Email" onChange={setRegisterEmailHandler}></input>
          <input
            placeholder="Password"
            type="password"
            onChange={setRegisterPasswordHandler}
          ></input>
          <select defaultValue="admin" onChange={setUserTypeHandler}>
            <option>admin</option>
            <option>student</option>
            <option>enthusiast</option>
            <option>photographer</option>
          </select>
          <button
            className="button modal-btns background-blue text-white text-bold hide"
            onClick={newUserHandler}
          >
            Add
          </button>
        </form>

        <button
          className="button modal-btns background-blue text-white text-bold"
          onClick={newUserHandler}
        >
          Add
        </button>
        <button
          className="button modal-btns"
          onClick={() => setIsAddUser(false)}
        >
          Cancel
        </button>
        <div className="modal-buttons"></div>
      </div>
    </div>
  );
};

export default AddUser;
