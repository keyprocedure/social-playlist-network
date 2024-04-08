"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import checkSessionCookie from '../../helpers/hooks/checkSessionCookie';

export default function Profile() {
  const isLoading = checkSessionCookie();

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div></div>
      ) : (
        <div style={{ margin: "20px", backgroundColor: "rgba(255, 255, 255, 0.75)", padding: "20px" }}>
          <h1>This is the user profile</h1>
          <button>Import</button>
        </div>
      )}
    </>
  )
}