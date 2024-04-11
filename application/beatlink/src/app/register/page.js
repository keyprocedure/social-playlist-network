// app/signUp/page.js

"use client";
import React from "react";
import Head from "next/head";
import RegisterPageLayout from "../components/RegisterPage/RegisterPageLayout";

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
        <RegisterPageLayout></RegisterPageLayout>
      </div>
    </>
  );
}
