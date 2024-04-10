import React, { useState } from "react";
import { CustomInput } from "../CustomInput.js";
import CustomTextWithLink from "../CustomTextWithLink.js";
import { CustomButton } from "../CustomButton.js";
import Navbar from "../navbar.js";
import "../css/LoginPageLayout.css";

export default function LoginPageLayout() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // TODO: Add logic for sending a login API request
  // function handleButtonClick() {}

  return (
    <>
      <Navbar />
      <div className="login-grid-container">
        <div className="login-title d-flex justify-content-center align-items-center">
          <h1>Login</h1>
        </div>

        <div className="login-form d-flex justify-content-center">
          <div className="form-container">
            <div className="d-flex flex-column">
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

              <CustomTextWithLink
                labelText={"Don't have an account yet? "}
                href={"/register"}
                linkText={"Register!"}
              ></CustomTextWithLink>

              {/* TODO: Add onChange prop for CustomButton that makes API request */}
              <CustomButton
                text={"Login"}
                className={"btn btn-dark login-btn"}
              ></CustomButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
