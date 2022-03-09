import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";

const ResetCode = ({
  code,
  toEmail,
  isCodeInputShown,
  setIsCodeInputShown,
  setIsResetPassInputShown,
  setResetMsg
}) => {
  if (!isCodeInputShown) {
    return null;
  }

  const [inputCode, setInputCode] = useState("");

  const checkCode = () => {
    if (code === inputCode) {
      toast.success("Success!");
      setIsCodeInputShown(false);
      setIsResetPassInputShown(true);
      setResetMsg("");
    } else {
      toast.error("Incorrect code. Try again.");
      setIsResetPassInputShown(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={checkCode}>
        <input
          type="text"
          id="reset-code"
          placeholder="Enter code here"
          onChange={(e) => setInputCode(e.target.value)}
        ></input>
      </form>
      <p className="reset-msg">
        A reset code was sent to <span className="text-bold "> {toEmail}</span>
      </p>
      <br />
      <button
        type="submit"
        className="button auth-button width-100 background-blue text-white text-bold"
      >
        Continue
      </button>
    </Fragment>
  );
};

export default ResetCode;
