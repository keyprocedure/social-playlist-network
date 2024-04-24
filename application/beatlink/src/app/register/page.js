// app/signUp/page.js

'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import RegisterPageLayout from '../components/RegisterPage/RegisterPageLayout'
import Navbar from '../components/navbar'
import Cookies from 'js-cookie'

export default function Register() {
  const router = useRouter()
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    if (Cookies.get('userid')) {
      router.push('/')
    } else {
      setShowRegister(true)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Register</title>
        <meta
          property="og:title"
          content="Register"
          key={'register-title'}
        ></meta>
      </Head>
      <div>
        <Navbar />
        {showRegister ? <RegisterPageLayout></RegisterPageLayout> : <div></div>}
      </div>
    </>
  )
}
