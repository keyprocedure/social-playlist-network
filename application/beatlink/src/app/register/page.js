// app/signUp/page.js

"use client";
import React from "react";
import Head from "next/head";
import RegisterPageLayout from "../components/RegisterPage/RegisterPageLayout";
import Navbar from "../components/navbar";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta
          property="og:title"
          content="Register"
          key={"register-title"}
        ></meta>
      </Head>
      <div>
        <Navbar />
        <RegisterPageLayout></RegisterPageLayout>
      </div>
    </>
  );
}
