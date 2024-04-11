import React, { useState } from "react";
import { CustomInput } from "../CustomInput.js";
import CustomTextWithLink from "../CustomTextWithLink.js";
import { CustomButton } from "../CustomButton.js";
import "../css/LoginPageLayout.css";
import { useRouter } from "next/navigation";
import CustomAlert from "../CustomAlert.js";

export default function LoginPageLayout() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      return setError("All fields are necessary.");
    }

    try {
      const response = await fetchLoginResponse(username, password);

      if (response.success) {
        Cookies.set("session", "token");
        return router.push("/"); // Redirect to home page on successful login
      }

      // If the response isn't successful, then it's in an error state
      setError("Invalid login credentials. Try again.");
    } catch (error) {
      setError(error.error);
    }
  }

  return (
    <>
      <div className="login-grid-container">
        <div className="login-title d-flex justify-content-center align-items-start">
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

            {error && (
              <CustomAlert text={error} type={"danger"} className="mt-3" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

async function fetchLoginResponse(username, password) {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    throw { success: false, error: error.message };
  }
}
