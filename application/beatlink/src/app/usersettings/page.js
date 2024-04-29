'use client'
import React from 'react'
import Head from 'next/head'
import UserSettingsPageLayout from '../components/UserSettingsPage/UserSettingsPageLayout'
import Navbar from '../components/navbar'

export default function UserSettings() {
  return (
    <>
      <Head>
        <title>User Settings</title>
      </Head>

      <Navbar />
      <UserSettingsPageLayout />
    </>
  )
}
