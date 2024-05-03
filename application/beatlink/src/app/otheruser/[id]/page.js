'use client'
import React from 'react'
import OtherUserPageLayout from '../../components/OtherUser/OtherUserLayout'
import Cookies from 'js-cookie'
import Navbar from '../../components/navbar.js'
import { useRouter } from 'next/navigation.js'

export default function OtherUserProfile({ params }) {
  const userId = params.id
  const loggedInUserId = Cookies.get('userid')
  const router = useRouter()

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
