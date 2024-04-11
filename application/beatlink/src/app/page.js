"use client";
import React from "react";
import checkSessionCookie from "../../helpers/hooks/checkSessionCookie";

export default function Home() {
	const isLoading = checkSessionCookie();

	return (
		<>
			{isLoading ? (
				<div></div>
			) : (
				<div
					style={{
						margin: "20px",
						backgroundColor: "rgba(255, 255, 255, 0.75)",
						padding: "20px",
					}}>
					<h1>Homepage is under construction.</h1>
					{/* Add your other content here */}
				</div>
			)}
		</>
	);
}
