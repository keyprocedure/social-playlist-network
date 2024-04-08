// app/signUp/page.js

"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RegisterPageLayout from "../components/RegisterPage/RegisterPageLayout";

async function signUpApi(email, username, password, birthday) {
	try {
		console.log("in signUpApi");
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
			console.log("response not ok");
			throw new Error("Signup failed");
		}

		const data = await response.json();

		return { success: true, data };
	} catch (error) {
		console.error("An error occurred during the signup process", error);
		return { success: false, error: error.message };
	}
}

export default function SignUp() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState("");
	const [bio, setBio] = useState("");
	const [status, setStatus] = useState("");
	const [userImage, setUserImage] = useState("");

	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!username || !email || !password || !birthday) {
			setError("All fields are necessary.");
			alert(error);
			return;
		}

		try {
			const response = await signUpApi(email, username, password, birthday);

			if (response.success) {
				localStorage.setItem(
					"registrationSuccess",
					"User created successfully. Please log in."
				);

				// Redirect to the login page
				router.push("/login");
			} else {
				// Handle registration errors (e.g., user already exists)
				alert("Registration failed. Please try again.");
			}
		} catch (error) {
			console.log("An unexpected error happened", error);
		}
	};

	return (
		<>
			<Head>
				<title>Register</title>
				<meta
					property="og:title"
					content="Register"
					key={"register-title"}></meta>
			</Head>
			<div>
				<RegisterPageLayout></RegisterPageLayout>
			</div>
		</>
	);
}
