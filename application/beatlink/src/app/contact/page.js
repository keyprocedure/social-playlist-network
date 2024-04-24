'use client'
import React from 'react'
import Navbar from '../components/navbar'
import CheckSessionCookie from '../../../helpers/hooks/CheckSessionCookie'

export default function Contact () {
  const isLoading = CheckSessionCookie()

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div></div>
      ) : (
        <div
          style={{
            margin: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            padding: '20px'
          }}
        >
          <h1>Contact page is under construction.</h1>
          {/* Add your other content here */}
        </div>
      )}
    </>
  )
}
