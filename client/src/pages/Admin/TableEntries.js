import React, { useState, Fragment } from "react";
import EditTableEntry from "./EditTableEntry";

const TableEntries = ({
  username,
  uid,
  email,
  type,
  isDelete,
  setIsDelete,
  setIdToDelete
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const editHandler = () => {
    setIsEdit(!isEdit);
  };
  const deleteUserModalHandler = () => {
    setIsDelete(!isDelete);
    setIdToDelete(uid);
  };

  return (
    <Fragment>
      <tr>
        <td>{uid}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{type}</td>
        <td>
          <span className="edit text-bold" onClick={editHandler}>
            EDIT
          </span>
          <span
            className="edit text-bold background-red"
            onClick={deleteUserModalHandler}
          >
            DELETE
          </span>
        </td>
      </tr>
      <EditTableEntry
        isEdit={isEdit}
        username={username}
        email={email}
        type={type}
        uid={uid}
        setIsEdit={setIsEdit}
        setIdToDelete={setIdToDelete}
      />
    </Fragment>
  );
};

export default TableEntries;
