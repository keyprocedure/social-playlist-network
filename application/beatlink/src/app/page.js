import React, { useContext, useState } from "react";
import Image from "next/image";
import Navbar from "./components/navbar";
import { LikeFillContext } from "./context/LikeFillContext";
import PostPage from "./post/[id]/page";


export default function Home() {
  const [likeFill, setLikeFill] = useState("none");
  return (
    <>
      <Navbar />
      <div style={{ margin: "20px", backgroundColor: "rgba(255, 255, 255, 0.75)", padding: "20px" }}>
        <h1>Homepage is under construction.</h1>
        {/* Add your other content here */}
      </div>
    </>
  );

}
