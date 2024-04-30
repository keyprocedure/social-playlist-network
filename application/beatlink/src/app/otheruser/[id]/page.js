'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import ProfilePageLayout from '../../components/Profile/ProfilePageLayout.js'
import Navbar from '../../components/navbar.js'
import { OtherUserPageLayout } from '../../components/OtherUser/OtherUserLayout.js'

export default function OtherUserProfile({ params }) {
  const userId = params.id
  const [userData, setUserData] = useState(null)
  const [playlistImages, setPlaylistImages] = useState([])
  const [user, setUser] = useState(null)

  const fetchData = async () => {
    try {
      const userid = await Cookies.get('userid')
      setUser(userid)
      const response = await fetch('/api/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })
      if (response) {
        const responseData = await response.json()
        setUserData(responseData.user)
        setPlaylistImages(responseData.posts)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId])

  return (
    <div>
      <Navbar />
      {userData ? (
        userData?._id === user ? (
          <ProfilePageLayout />
        ) : (
          <OtherUserPageLayout
            userData={userData}
            playlistImages={playlistImages}
            fetchData={fetchData}
            userId={user}
          />
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
