'use client'
import React from 'react'
import Navbar from '../components/navbar'
import CreatePost from '../components/CreatePost'
import CheckSessionCookie from '../../../helpers/hooks/CheckSessionCookie'

export default function CreatePostPage() {
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
            padding: '20px',
          }}
        >
          <h1>Create New Post</h1>
          <CreatePost />
        </div>
      )}
    </>
  )
}
