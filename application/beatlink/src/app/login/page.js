// app/login/page.js

"use client";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import LoginPageLayout from "../components/LoginPage/LoginPageLayout";
import Navbar from "../components/navbar";

//TODO: Connect API to front-end

export default function Login() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const response = await loginApi(username, password);

      if (response.success) {
        const response = await fetch(`/api/getuser/${username}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await response.json();
        Cookies.set('userid', userData._id);

        router.push('/');
      } else {
        alert("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      console.log("An unexpected error happened", error);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Navbar />
      <LoginPageLayout />
      {/*Transparent page background/margins*/}
    </>
  );
}
