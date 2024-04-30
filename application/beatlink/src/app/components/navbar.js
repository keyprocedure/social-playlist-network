'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check the session cookie when the component mounts in the client
    const session = Cookies.get('userid')
    setIsLoggedIn(!!session)
  }, [])

  return (
    <nav className="nav">
      <a href="/" className="site-title">
        <img
          src="https://i.ibb.co/WPRMdwY/logo-png.png"
          alt="Site Logo"
          className="site-logo"
          style={{ width: '100px', height: 'auto' }}
        />
      </a>
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
          {isLoggedIn && (
            <li>
              <a href="/create-post">CREATE POST</a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a href="/usersettings">SETTINGS</a>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <a href="/logout" className="nav-link-auth">
                LOGOUT
              </a>
            ) : (
              <a href="/login" className="nav-link-auth">
                LOGIN
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
