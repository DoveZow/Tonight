import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetActualPass = ({
  toEmail,
  isResetPassInputShown,
  setIsResetPassInputShown
}) => {
  if (!isResetPassInputShown) {
    return null;
  }
  let navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();
    if (confirmNewPassword === newPassword) {
      toast.success("Password changed successfully.");
      navigate("/");
      setIsResetPassInputShown(false);
      try {
        const body = { confirmNewPassword, toEmail };
        await fetch("/changepass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
      } catch (err) {
        console.error(err.message);
        toast.error("Error.");
      }
    } else {
      toast.error("Passwords don't match.");
    }
  };

  return (
    <form onSubmit={resetPassword}>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setNewPassword(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="Re-type new password"
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      ></input>
      <button
        type="submit"
        className="button auth-button width-100 background-blue text-white text-bold"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetActualPass;
