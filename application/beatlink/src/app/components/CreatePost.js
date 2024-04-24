'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePost() {
  const router = useRouter()
  const [postTitle, setPostTitle] = useState('')
  const [spotifyLink, setSpotifyLink] = useState('')
  const [error, setError] = useState('')

  const userId = '6616e868a3e695cd57e3a223' // hard-coded values for now since our app can't distinguish who's logged in yet

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!postTitle || !spotifyLink) {
      return setError('All fields are necessary to create a post.')
    }

    if (!spotifyLink.startsWith('https://open.spotify.com/playlist')) {
      return setError('Not a valid Spotify Playlist URL')
    }

    const playlistId = spotifyLink.split('/playlist/')[1].split('?')[0]

    const response = await CreatePostApi(
      postTitle,
      spotifyLink,
      userId,
      playlistId,
    )

    if (response.success) {
      router.push(`post/${response.data.postId}`) // Redirect
    } else {
      setError(response.error || 'Creating Post failed. Try again.')
    }
  }

  return (
    <>
      <div
        style={{
          margin: '20px',
          backgroundColor: 'rgba(255, 255, 255, .75)',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label htmlFor="postTitle">Title: </label>
            <input
              type="text"
              id="postTitle"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="spotifyLink">Spotify Link: </label>
            <input
              type="url"
              id="spotifyLink"
              value={spotifyLink}
              onChange={(e) => setSpotifyLink(e.target.value)}
            />
          </div>
          <br />
          <br />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </>
  )
}

async function CreatePostApi(postTitle, spotifyLink, userId, playlistId) {
  try {
    const response = await fetch('/api/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postTitle,
        spotifyLink,
        userId,
        playlistId,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error('Create Post failed. Try again')
    }

    return { success: true, data }
  } catch (error) {
    console.error('An error occurred during the creating process', error)
    return { success: false, error: error.message }
  }
}
