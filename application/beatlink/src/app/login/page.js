"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import { useRouter } from 'next/navigation'
import { route } from '../api/auth/route'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault();
    // Here you can implement your authentication logic
    // For simplicity, I'm just logging the username and password
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const response = await route({ username, password })

      if (response.success) {
        router.push('/userprofile')
      } else {
        // Handle errors
        alert('Invalid login credentials. Please try again.')
      }
    } catch (error) {
      // Handle errors
      console.log('An unexpected error happened', error)
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      {/*Navigation bar at top of page*/}
      <Navbar />

      {/*Transparent page background/margins*/}
      <div style={{ margin: "20px", backgroundColor: "rgba(255, 255, 255, .75)", padding: "20px", textAlign: "center" }}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          {/*Username Form*/}
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br></br>
          {/*Password Form*/}
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/*Login and Sign Up buttons with CSS*/}
          <br></br>
          <button type="submit">Login</button> &nbsp;
          <p> Don't have an account yet? </p>
          <button><a href="/signUp" style={{ textDecoration: "none", color: "inherit" }}>Sign Up</a></button>

        </form>
      </div>
    </>
  );
}
