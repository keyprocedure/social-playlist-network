'use client'
import React, { useState, useEffect } from 'react'
import OtherUserPageLayout from '../../components/OtherUser/OtherUserLayout'
import Cookies from 'js-cookie'
import Navbar from '../../components/navbar.js'
import { useRouter } from 'next/navigation.js'

export default function OtherUserProfile({ params }) {
  const userId = params.id
  const loggedInUserId = Cookies.get('userid')
  // const [userData, setUserData] = useState(null) // user data of the person's profile
  // const [playlistImages, setPlaylistImages] = useState([]) // stores all post/playlist images
  const router = useRouter()

  // useEffect(() => {
  //   fetchData(userId).then((responseData) => {
  //     setUserData(responseData.user)
  //     setPlaylistImages(
  //       responseData.posts.filter((item) => {
  //         if (item === null) {
  //           return false
  //         }
  //         return true
  //       }),
  //     )
  //   })
  // }, [userId])

  return (
    <div>
      {' '}
      <Navbar />
      {loggedInUserId === userId ? (
        router.push('/profile')
      ) : (
        <OtherUserPageLayout userId={userId} loggedInUserId={loggedInUserId} />
      )}
    </div>
  )
}
