import React, { useState } from "react";
import { CustomInput } from "../CustomInput.js";
import CustomTextWithLink from "../CustomTextWithLink.js";
import { CustomButton } from "../CustomButton.js";
import "../css/LoginPageLayout.css";
import { useRouter } from "next/navigation";
import CustomAlert from "../CustomAlert.js";
import Cookies from "js-cookie";

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

      if (response.ok) {
        const getUserResponse = await fetch(`../../api/getuser/${username}`);

        if (!getUserResponse.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await getUserResponse.json();
        Cookies.set("userid", userData._id);

        router.push("/"); // Redirect to home page on successful login
      }
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
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column">
                <div className="input-group mb-3">
                  <CustomInput
                    type={"text"}
                    placeholderText={"Username"}
                    name={"username"}
                    className={"form-control"}
                    onChange={handleUsernameChange}
                  ></CustomInput>
                </div>

                <div className="input-group mb-3">
                  <CustomInput
                    type={"password"}
                    placeholderText={"Password"}
                    name={"password"}
                    className={"form-control"}
                    onChange={handlePasswordChange}
                  ></CustomInput>
                </div>

                <CustomTextWithLink
                  labelText={"Don't have an account yet? "}
                  href={"/register"}
                  linkText={"Register!"}
                ></CustomTextWithLink>

                <CustomButton
                  type={"submit"}
                  text={"Login"}
                  className={"btn btn-dark login-btn"}
                ></CustomButton>

                {error && (
                  <CustomAlert text={error} type={"danger"} className="mt-3" />
                )}
              </div>
            </form>
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

    return data;
  } catch (error) {
    throw { error: error.message };
  }
}
