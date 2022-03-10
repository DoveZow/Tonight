import React from "react";
import { Fragment } from "react";

const ResetEmail = ({
  resetForm,
  sendCode,
  setToEmail,
  isEmailInputShown,
  setIsToEmailValid,
  resetMsg
}) => {
  if (!isEmailInputShown) {
    return null;
  }

  const setToEmailHandler = (e) => {
    setToEmail(e.target.value);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(e.target.value)) {
      setIsToEmailValid(true);
    } else {
      setIsToEmailValid(false);
    }
  };

  return (
    <Fragment>
      <p className="reset-msg">{resetMsg}</p>
      <form ref={resetForm} onSubmit={sendCode}>
        <input
          type="text"
          id="reset-email"
          placeholder="Email"
          name="to_email"
          onChange={setToEmailHandler}
        ></input>
        <button
          type="submit"
          onClick={sendCode}
          className="button auth-button width-100 background-blue text-white text-bold"
        >
          Send code
        </button>
      </form>
    </Fragment>
  );
};

export default ResetEmail;
