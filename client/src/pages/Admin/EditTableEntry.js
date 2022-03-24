import React, { useState, useEffect } from "react";
import "./Admin.css";
const EditTableEntry = ({
  isEdit,
  uid,
  username,
  email,
  type,
  setIsEdit,
  setIdToDelete
}) => {
  if (!isEdit) {
    return null;
  }
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newType, setNewType] = useState(type);
  let userId = uid;
  setIdToDelete(uid);
  const setNewUsernameHandler = (e) => {
    setNewUsername(e.target.value);
  };
  const setNewEmailHandler = (e) => {
    setNewEmail(e.target.value);
    // if (e.target.value == "") {
    //   setNewEmail(email);
    // }
  };
  const setNewTypeHandler = (e) => {
    setNewType(e.target.value);
  };

  const changeCredsHandler = async () => {
    window.location.reload(false);
    setIsEdit(false);
    try {
      const body = { uid, newUsername, newEmail, newType };
      await fetch("/changeusercreds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(newEmail);
  return (
    <tr id="edittr">
      <th></th>
      <th>
        <input defaultValue={username} onChange={setNewUsernameHandler} />
      </th>
      <th>
        <input defaultValue={email} onChange={setNewEmailHandler} />
      </th>
      <th>
        <select defaultValue={type} onChange={setNewTypeHandler}>
          <option>admin</option>
          <option>student</option>
          <option>enthusiast</option>
          <option>photographer</option>
        </select>
      </th>
      <th>
        <h5 className="edit save" onClick={changeCredsHandler}>
          SAVE
        </h5>
      </th>
    </tr>
  );
};

export default EditTableEntry;
