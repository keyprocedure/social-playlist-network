import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <a href="/about">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/about">About Page</button>
      </a>
    </>

  );
}
