import React from "react";
import "./Admin.css";

const DeleteCheck = ({ isDelete, setIsDelete, idToDelete }) => {
  if (!isDelete) {
    return null;
  }

  const deleteUserHandler = async () => {
    window.location.reload(false);
    setIsDelete(false);
    try {
      const body = { idToDelete };
      await fetch("/deleteuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="center-content modal-background">
      <div className="modal-card">
        <h4>
          Are you sure you want to delete this user?
          <br />
        </h4>
        <div className="modal-buttons">
          <button
            className="button modal-btns background-red text-white text-bold"
            onClick={deleteUserHandler}
          >
            Yes
          </button>
          <button
            className="button modal-btns"
            onClick={() => setIsDelete(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCheck;
