'use client'
import React, { useState, useEffect } from 'react'
import OtherUserPageLayout from '../../components/OtherUser/OtherUserLayout'
import Cookies from 'js-cookie'
import ProfilePageLayout from '../../components/Profile/ProfilePageLayout.js'
import Navbar from '../../components/navbar.js'

export default function OtherUserProfile({ params }) {
  const userId = params.id
  const [userData, setUserData] = useState(null)
  const [playlistImages, setPlaylistImages] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userid = Cookies.get('userid')
    setUser(userid)

    fetchData(userid).then((responseData) => {
      setUserData(responseData.user)
      setPlaylistImages(responseData.posts)
    })
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

const fetchData = async (userId) => {
  try {
    const response = await fetch('/api/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    if (response) {
      const responseData = await response.json()
      return responseData
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}
