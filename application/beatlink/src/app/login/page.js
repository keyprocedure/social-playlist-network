// app/login/page.js

"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import LoginPageLayout from "../components/LoginPage/LoginPageLayout";
import Navbar from "../components/navbar";
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get('userid')) {
      router.push('/'); 
    }
    else {
      setShowLogin(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const response = await loginApi(username, password);
      if (response.success) {
        Cookies.set("session", "token");
        router.push("/");
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
      {showLogin ? (
        <LoginPageLayout />
      ) : (
        <div></div>
      )}
    </>
  );
}