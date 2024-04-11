import React, { useState } from "react";
import { CustomInput } from "../CustomInput";
import "../css/RegisterPageLayout.css";
import CustomTextWithLink from "../CustomTextWithLink.js";
import { CustomButton } from "../CustomButton.js";
import { useRouter } from "next/navigation";
import CustomAlert from "../CustomAlert.js";

export default function RegisterPageLayout() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !birthday.trim()
    ) {
      return setError("All fields are necessary.");
    }

    if (!(await isValidBirthDate(birthday))) {
      return setError("Must be 13 years or older.");
    }

    const response = await fetchSignUpResponse(
      email,
      username,
      password,
      birthday,
    );

    if (response.error) {
      return setError(response.error);
    }
    // Redirect to login page on successful register
    router.push("/login");
  }

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

  return (
    <>
      <div className="register-grid-container">
        <div className="register-title d-flex justify-content-center align-items-start">
          <h1>Register</h1>
        </div>

        <div className="register-form d-flex justify-content-center">
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
                onClick={handleSubmit}
              ></CustomButton>

              {/* */}
              {error && (
                <CustomAlert text={error} type={"danger"} className={"mt-3"} />
              )}
              {/* <CustomAlert
                text={"Test"}
                type={"danger"}
                className={"mt-3"}
              ></CustomAlert> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function fetchSignUpResponse(email, username, password, birthday) {
  try {
    const response = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        birthday,
      }),
    });

    if (!response.ok) {
      throw new Error("Register Failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function isValidBirthDate(birthday) {
  // Check if birthday is less than 13 years ago
  const birthDate = new Date(birthday + "T00:00:00"); // This sets the time part to midnight
  const timezoneOffset = birthDate.getTimezoneOffset() * 60000; // Convert offset to milliseconds
  const adjustedBirthDate = new Date(birthDate.getTime() - timezoneOffset);

  const currentDate = new Date();
  // Default time to midnight to ignore time comparison
  const adjustedCurrentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  let age = adjustedCurrentDate.getFullYear() - adjustedBirthDate.getFullYear();
  const m = adjustedCurrentDate.getMonth() - adjustedBirthDate.getMonth();

  // if the current month is before the birth month or
  // if the current month is the same as the birth month and the current day is before the birth day
  // +1 because birthdate is 1 day behind the entered date
  if (
    m < 0 ||
    (m === 0 && adjustedCurrentDate.getDate() < adjustedBirthDate.getDate() + 1)
  ) {
    age--;
  }

  if (age < 13) {
    return false;
  }

  return true;
}
