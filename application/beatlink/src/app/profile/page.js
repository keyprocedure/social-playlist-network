"use client";
import React, { useState, useEffect, Suspense } from "react";
import ProfilePageLayout from "../components/Profile/ProfilePageLayout";
import Navbar from "../components/navbar";

export default function ProfilePage({ params }) {
  return (
    <>
      <Navbar />
      <ProfilePageLayout />
    </>
  );
}
