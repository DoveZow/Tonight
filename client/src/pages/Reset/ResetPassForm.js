import React, { useState, useRef, useEffect } from "react";
import GenerateRandomCode from "react-random-code-generator";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import ResetEmail from "./ResetEmail";
import ResetCode from "./ResetCode";
import ResetActualPass from "./ResetActualPass";

const ResetPassForm = () => {
  const resetCode = GenerateRandomCode.TextCode(6).toUpperCase();

  // use states
  const [toEmail, setToEmail] = useState("");

  const [code, setCode] = useState("");
  const [resetMsg, setResetMsg] = useState(
    "If your email is connected to an account, a reset code will be sent to the email you provide here. Check your spam folder if you don't see it."
  );

  const [isEmailInputShown, setIsEmailInputShown] = useState(true);
  const [isCodeInputShown, setIsCodeInputShown] = useState(false);
  const [isResetPassInputShown, setIsResetPassInputShown] = useState(false);
  const [isToEmailValid, setIsToEmailValid] = useState(false);

  // email function
  useEffect(() => {
    setCode(resetCode);
  }, []);

  const templateParams = {
    code: code,
    to_email: toEmail
  };
  const resetForm = useRef();
  const sendCode = (e) => {
    e.preventDefault();
    if (!isToEmailValid && !(toEmail === "")) {
      toast.error("Invalid email.");
    } else if (toEmail === "") {
      toast.error("Please type in your email.");
    } else {
      emailjs
        .send(
          "service_2hhyfnf",
          "template_urf2mjv",
          templateParams,
          "CQG4UAhGwMDhpAnEa"
        )
        .then(
          function(response) {
            console.log("SUCCESS!", response.status, response.text);
            toast.success("Code sent to your email");
            setIsEmailInputShown(false);
            setIsCodeInputShown(true);
            setResetMsg(
              "Do not refresh or navigate away from this page. Enter the reset code you received in your email here."
            );
          },
          function(error) {
            console.log("FAILED...", error);
            toast.error("Unable to send code. Try again.");
            setIsEmailInputShown(true);
            setIsCodeInputShown(false);
          }
        );
      // e.target.reset();
    }
  };
  // end email function

  return (
    <div className="form-wrapper register-form-wrapper">
      <ResetEmail
        resetForm={resetForm}
        sendCode={sendCode}
        setToEmail={setToEmail}
        isEmailInputShown={isEmailInputShown}
        isResetPassInputShow={isResetPassInputShown}
        setIsCodeInputShown={setIsResetPassInputShown}
        setIsToEmailValid={setIsToEmailValid}
        resetMsg={resetMsg}
      />
      <ResetCode
        code={code}
        sendCode={sendCode}
        setToEmail={setToEmail}
        setCode={setCode}
        setResetMsg={setResetMsg}
        resetForm={resetForm}
        isEmailInputShown={isEmailInputShown}
        setIsEmailInputShown={setIsEmailInputShown}
        isCodeInputShown={isCodeInputShown}
        setIsCodeInputShown={setIsCodeInputShown}
        toEmail={toEmail}
        setIsResetPassInputShown={setIsResetPassInputShown}
        resetMsg={resetMsg}
      />

      <ResetActualPass
        isEmailInputShown={isEmailInputShown}
        isCodeInputShown={isCodeInputShown}
        toEmail={toEmail}
        setIsResetPassInputShown={setIsResetPassInputShown}
        isResetPassInputShown={isResetPassInputShown}
      />
    </div>
  );
};

export default ResetPassForm;
