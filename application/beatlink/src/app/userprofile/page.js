"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  // useEffect(() => {
  //   // Check if there's an auth token
  //   const token = localStorage.getItem('authToken');
    
  //   // If not, redirect to the login page
  //   if (!token) {
  //     //alert('Log in to access this page.')
  //     router.push('/login');
  //   }
  // }, [router]);

  return (
    <>
    <Navbar/>
    <h1>This is the user profile</h1>
    <button>Import</button>
    </> 

  )
  

  
  
  
}