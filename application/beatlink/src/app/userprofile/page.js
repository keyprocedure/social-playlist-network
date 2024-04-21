"use client";
import React from "react";
import Navbar from "../components/navbar.js";
import CheckSessionCookie from "../../../helpers/hooks/CheckSessionCookie.js";

export default function Profile() {
	const isLoading = CheckSessionCookie();

	return (
		<>
			<Navbar />
			{isLoading ? (
				<div></div>
			) : (
				<div
					style={{
						margin: "20px",
						backgroundColor: "rgba(255, 255, 255, 0.75)",
						padding: "20px",
					}}>
					<h1>This is the user profile</h1>
					<button>Import</button>
				</div>
			)}
		</>
	);
}
