"use client";
import React from "react";
import Cookies from 'js-cookie';

export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">
                <img src="images/logo.png.png" alt="Site Logo" className="site-logo" style={{ width: "100px", height: "auto" }}/></a>

        <div>
        <ul id="navbar">
            <li>
                <a href="/">HOME</a>
            </li>
            <li>
                <a href="/about">ABOUT</a>
            </li>
            <li>
                <a href="/explore">EXPLORE</a>
            </li>
            <li>
                <a href="/contact">CONTACT</a>
            </li>
            <li>
             {Cookies.get('session') ? <a href="/logout">LOGOUT</a> : <a href="/login">LOGIN</a>} 
            </li>
        </ul>
        </div>

    </nav>

}

