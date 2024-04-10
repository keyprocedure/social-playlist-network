// app/signUp/page.js

"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';

async function signUpApi(email, username, password, birthday) {
  try {
    const response = await fetch('/api/registration', {
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
      alert("All fields are necessary.");
      return;
   }

    // Check if birthday is less than 13 years ago
    const birthDate = new Date(birthday + 'T00:00:00'); // This sets the time part to midnight
    const timezoneOffset = birthDate.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const adjustedBirthDate = new Date(birthDate.getTime() - timezoneOffset);

    const currentDate = new Date();
    // Default time to midnight to ignore time comparison
    const adjustedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); 

    let age = adjustedCurrentDate.getFullYear() - adjustedBirthDate.getFullYear();
    const m = adjustedCurrentDate.getMonth() - adjustedBirthDate.getMonth();

    // if the current month is before the birth month or
    // if the current month is the same as the birth month and the current day is before the birth day
    // +1 because birthdate is 1 day behind the entered date
    if (m < 0 || (m === 0 && adjustedCurrentDate.getDate() < adjustedBirthDate.getDate() + 1)) {
      age--;
    }

    if (age < 13) {
      alert("You must be at least 13 years old to sign up.");
      return;
    }

    try {
      const response = await signUpApi(email,username, password, birthday);

      if (response.success) {
        alert('User created successfully. Please log in.');

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
            <label htmlFor="userImage">User Image: </label>
            <input
              type="file"
              id="userimage"
              value={userImage}
              onChange={(e) => setUserImage(e.target.value)}
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
