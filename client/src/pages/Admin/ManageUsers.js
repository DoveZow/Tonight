import React, { Fragment, useEffect, useState } from "react";
import TableEntries from "./TableEntries";
import "./Admin.css";
import DeleteCheck from "./DeleteCheck";
import AddUser from "./AddUser";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ManageUsers = ({ isAdmin }) => {
  if (!isAdmin) {
    return null;
  }
  let navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [isAddUser, setIsAddUser] = useState(false);

  const getAllUserCredentials = async () => {
    try {
      const response = await fetch("/getall", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();
      setAllUsers(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getAllUserCredentials();
  }, []);

  console.log(idToDelete);
  return (
    <Fragment>
      <div className="background-blue center-content">
        <div className="back-to-dash global-width">
          <button
            className="button back-to-dash-btn"
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon className="fa-arrow-right" icon={faArrowLeft} />
            &nbsp;&nbsp;Back to dashboard
          </button>
        </div>
      </div>

      <div className="center-content background-blue text-white admin-header text-bold">
        <div>
          <h2>Manage Site Users</h2>
        </div>
      </div>
      <div className="center-content adduser-container">
        <button
          className="button background-blue text-white text-bold"
          onClick={() => setIsAddUser(!isAddUser)}
        >
          Add a user +
        </button>
      </div>

      <div className="site-table-container center-content">
        <table id="users">
          <tr>
            <th id="userid">User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Account Type</th>
            <th id="actions">Actions</th>
          </tr>
          {allUsers.map((item) => (
            <TableEntries
              uid={item.uid}
              username={item.uname}
              email={item.uemail}
              type={item.utype}
              isDelete={isDelete}
              setIsDelete={setIsDelete}
              setIdToDelete={setIdToDelete}
            />
          ))}
        </table>
      </div>
      <DeleteCheck
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        idToDelete={idToDelete}
      />
      <AddUser isAddUser={isAddUser} setIsAddUser={setIsAddUser} />
    </Fragment>
  );
};

export default ManageUsers;
