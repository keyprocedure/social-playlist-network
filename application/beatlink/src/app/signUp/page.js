"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your sign-up logic
    // For simplicity, I'm just logging the username, password, and birthday
    
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Birthday:", birthday);
    console.log("Email:", email);
  };

  return (
    <>
      <Head>
        <title>Sign-Up</title>
      </Head>
      <Navbar />
      <div style={{ margin: "20px", backgroundColor: "rgba(255, 255, 255, .75)", padding: "20px", textAlign: "center" }}>
        <h2>Need an account? Sign up below!</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email: </label> {/* New email input field */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="birthday">Birthday: </label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
