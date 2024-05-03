'use client'
import React, { useState, useEffect } from 'react'
import ProfilePageLayout from '../components/Profile/ProfilePageLayout'
import Navbar from '../components/navbar'
import Cookies from 'js-cookie'
import CheckSessionCookie from '../../../helpers/hooks/CheckSessionCookie'
import { Spinner } from '@chakra-ui/react'

export default function ProfilePage() {
  CheckSessionCookie()
  const [userData, setUserData] = useState(null)
  const [playlistImages, setPlaylistImages] = useState(null)

  const userId = Cookies.get('userid')
  useEffect(() => {
    getData(userId).then((responseData) => {
      setUserData(responseData.user)
      setPlaylistImages(
        responseData.posts.filter((item) => {
          if (item === null) {
            return false
          }
          return true
        }),
      )
    })
  }, [userId])
  return (
    <>
      <Navbar />
      {userData && playlistImages ? (
        <ProfilePageLayout
          userData={userData}
          playlistImages={playlistImages}
        />
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </>
  )
}

const getData = async (userId) => {
  try {
    const response = await fetch('/api/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error('Response Error')
    }

    const responseJSON = await response.json()
    return responseJSON
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}
