"use client";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Navbar() {
    /*
    const [isLogged, setIsLogged] = useState(null); // null indicates loading/not yet checked

    useEffect(() => {
        const timer = setTimeout(() => {
            const session = Cookies.get('session');
            setIsLogged(!!session); // true for logged in, false for not logged in
        }, 90); // Delays the check

        return () => clearTimeout(timer);
    }, []);

    // Conditional rendering based on isLogged state
    const renderAuthLink = () => {
        if (isLogged === null) {
            return <a style={{ visibility: 'hidden' }} className="nav-link-auth">LOGIN</a>;
        }
        return isLogged ? <a href="/logout" className="nav-link-auth">LOGOUT</a> : <a href="/login" className="nav-link-auth">LOGIN </a>;
    };

    // {renderAuthLink()}
*/
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
                    <li>{Cookies.get('session') ? <a href="/logout" className="nav-link-auth">LOGOUT</a> : <a href="/login" className="nav-link-auth">LOGIN</a>} </li>
                </ul>
            </div>
        </nav>
    );
}