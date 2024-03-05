import React from "react";
import Image from "next/image";
import Navbar from "../components/navbar";

export default function Login() {

  return (
    <>
      <Navbar />
      <div style={{ margin: "20px", backgroundColor: "rgba(255, 255, 255, .75)", padding: "20px" }}>
        <h1>This is the login page</h1>
        <button>Login</button>
        {/* Add your other content here */}
      </div>
    </>
  );
  

  
  
  
}