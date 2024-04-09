import React, { useState } from "react";
import { CustomInput } from "../CustomInput";
import "../css/RegisterPageLayout.css";
import CustomTextWithLink from "../CustomTextWithLink.js";
import { CustomButton } from "../CustomButton.js";

export default function RegisterPageLayout() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
  }

  // TODO: add logic for sending a request to the API here
  function handleButtonClick() {}

  return (
    <>
      <h1>Register</h1>
      <div className="form-container">
        <div className="d-flex flex-column">
          <div className="input-group mb-3">
            <CustomInput
              type={"email"}
              placeholderText={"Email"}
              className={"form-control"}
              onChange={handleEmailChange}
            ></CustomInput>
          </div>

          <div className="input-group mb-3">
            <CustomInput
              type={"text"}
              placeholderText={"Username"}
              className={"form-control"}
              onChange={handleUsernameChange}
            ></CustomInput>
          </div>

          <div className="input-group mb-3">
            <CustomInput
              type={"password"}
              placeholderText={"Password"}
              className={"form-control"}
              onChange={handlePasswordChange}
            ></CustomInput>
          </div>

          <div className="input-group mb-3">
            <CustomInput
              type={"date"}
              placeholderText={"Birthday"}
              className={"form-control"}
              onChange={handleBirthdayChange}
            ></CustomInput>
          </div>

          <CustomTextWithLink
            labelText={"Already have an account? "}
            href={"/login"}
            linkText={"Login!"}
          ></CustomTextWithLink>

          <CustomButton
            text={"Register"}
            className={"btn btn-dark register-btn"}
          ></CustomButton>
        </div>
      </div>
    </>
  );
}
