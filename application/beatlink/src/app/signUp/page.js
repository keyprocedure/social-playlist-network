"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';

async function signUpApi(email, username, password, birthday) {
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
        birthday
      }),
    });
    
    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('An error occurred during the signup process', error);
    return { success: false, error: error.message };
  }
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can implement your sign-up logic
    // For simplicity, I'm just logging the username, password, and birthday

    if (!username || !email || !password || !birthday) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const response = await signUpApi(email,username, password, birthday);

      if (response.success) {
        
        // localStorage.setItem('registrationSuccess', 'User created successfully. Please log in.');

        // Redirect to the login page
        router.push('/login');
      } else {
        // Handle registration errors (e.g., user already exists)
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.log('An unexpected error happened', error);
    }
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
