import React, { useState } from "react";
import { CustomInput } from "../CustomInput";
import "../css/RegisterPageLayout.css";

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

	return (
		<>
			<h1>Register</h1>
			<div className="d-flex flex-column form-container">
				<div className="input-group mb-3">
					<CustomInput
						type={"email"}
						placeholderText={"Email"}
						className={"form-control"}
						onChange={handleEmailChange}></CustomInput>
				</div>

				<div className="input-group mb-3">
					<CustomInput
						type={"text"}
						placeholderText={"Username"}
						className={"form-control"}
						onChange={handleUsernameChange}></CustomInput>
				</div>

				<div className="input-group mb-3">
					<CustomInput
						type={"password"}
						placeholderText={"Password"}
						className={"form-control"}
						onChange={handlePasswordChange}></CustomInput>
				</div>

				<div className="input-group mb-3">
					<CustomInput
						type={"date"}
						placeholderText={"Birthday"}
						className={"form-control"}
						onChange={handleBirthdayChange}></CustomInput>
				</div>
			</div>
		</>
	);
}
