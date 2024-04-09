"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"
import dynamic from 'next/dynamic';

// Dynamically import AuthLink with SSR disabled
const AuthLinkWithNoSSR = dynamic(() => import('./AuthLink'), {
    ssr: false,
  });
  
export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">
                <img src="images/logo.png.png" alt="Site Logo" className="site-logo" style={{ width: "100px", height: "auto" }} />
            </a>

            <div>
                <ul id="navbar">
                    <li><a href="/">HOME</a></li>
                    <li><a href="/about">ABOUT</a></li>
                    <li><a href="/explore">EXPLORE</a></li>
                    <li><a href="/contact">CONTACT</a></li>
                    <li><AuthLinkWithNoSSR /></li>
                </ul>
            </div>
        </nav>
    );
}