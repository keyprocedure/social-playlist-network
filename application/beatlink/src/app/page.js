import React from "react";
import Image from "next/image";
import Navbar from "./components/navbar";



export default function Home() {

  return (
    <>
      <Navbar />
      <div style={{ margin: "20px", backgroundColor: "rgba(255, 255, 255, 0.75)", padding: "20px" }}>
        <h1>This is the homepage</h1>
        {/* Add your other content here */}
      </div>
    </>
  );
 
}
