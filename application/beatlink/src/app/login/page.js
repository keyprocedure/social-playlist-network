// app/login/page.js

"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

async function loginApi(username, password) {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    });

    if (!response.ok) {
      console.log('response not ok');
      throw new Error('Login failed');
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error('An error occurred during the login process', error);
    return { success: false, error: error.message };
  }
}

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are necessary.");
      return;
    }

    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const response = await loginApi(username, password);
      if (response.success) {
        Cookies.set('session', 'token');
        console.log('Login successful');
        router.push('/');
      } else {
        alert('Invalid login credentials. Please try again.');
      }
    } catch (error) {
      console.log('An unexpected error happened', error);
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