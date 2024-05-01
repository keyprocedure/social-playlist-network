'use client'
import React, { useState, useEffect } from 'react'
import styles from '../css/profile.module.scss'
import BackButton from '../PostPage/BackButton'
import { useRouter } from 'next/navigation'
import CheckSessionCookie from '../../../../helpers/hooks/CheckSessionCookie'

export default function OtherUserPageLayout({ userId, loggedInUserId }) {
  CheckSessionCookie() // Check if user is logged in, will redirect if not
  const [profileUserData, setProfileUserData] = useState(null)
  const [playlistImages, setPlaylistImages] = useState(null)
  const [userFollowerCount, setUserFollowerCount] = useState(0)
  const [userFollowingCount, setUserFollowingCount] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchUser(userId).then((profileUserData) => {
      setProfileUserData(profileUserData)

      setUserFollowerCount(profileUserData.user.followers.length)
      setUserFollowingCount(profileUserData.user.following.length)

      // If user is already following profile, then mark it as following
      if (profileUserData.user.followers.includes(loggedInUserId)) {
        setIsFollowing(true)
      }
      setPlaylistImages(profileUserData.posts.filter((item) => item !== null))
    })
  }, [userFollowerCount, loggedInUserId, userId])

  const handleImageClick = (id) => {
    router.push(`/post/${id}`)
  }

  async function handleFollowClick() {
    try {
      const input = {
        userId: loggedInUserId,
        followId: profileUserData.user._id,
      }

      const response = await fetch('/api/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      if (!response.ok) {
        throw new Error('Follow user failed. Try again')
      }

      if (isFollowing) {
        setUserFollowerCount(userFollowerCount - 1)
      } else {
        setUserFollowerCount(userFollowerCount + 1)
      }

      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error('An error occurred during the follow process', error)
      return { success: false, error: error.message }
    }
  }

  return (
    <>
      {profileUserData ? (
        <div className={styles.profileMainDiv}>
          <div className={styles.profileContainer}>
            <div
              className="back-button"
              style={{ justifyContent: 'flex-start' }}
            >
              <BackButton width={'40px'} height={'40px'} />
            </div>
            <div className={styles.profileTopMain}>
              <div className={styles.profileLeftMain}>
                <div className={styles.profileTopLeft}>
                  <div className={styles.profileTopLeftImg}>
                    {profileUserData.user.userImage ? (
                      <img src={profileUserData.user.userImage} alt="PROFILE" />
                    ) : (
                      <img src="/defaultprofile.png" alt="Default Profile" />
                    )}
                  </div>
                  <div className={styles.profileTopLeftText}>
                    <h2>{profileUserData.user.username}</h2>
                    <p>{profileUserData.user.email}</p>
                  </div>
                </div>
                <div style={{ width: '50%' }}>{profileUserData.user.bio}</div>
              </div>
              <div className={styles.profileTopRightMain}>
                <div className={styles.profileTopRight}>
                  <div>
                    <h2>{(playlistImages && playlistImages?.length) || 0}</h2>
                    <p>Posts</p>
                  </div>
                  <div>
                    <h2> {userFollowerCount}</h2>
                    <p>Followers</p>
                  </div>
                  <div>
                    <h2>{userFollowingCount}</h2>
                    <p>Following</p>
                  </div>
                </div>
                <div className={styles.profileFollow}>
                  <p onClick={handleFollowClick}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.profileCenterMain}></div>
            <div className={styles.profileBottomMain}>
              <div
                className={styles.profileImagesPlay}
                style={{
                  display: 'grid',
                  gap: '10px',
                  gridTemplateColumns: 'repeat(5,1fr)',
                }}
              >
                {playlistImages.map((posts) => (
                  <div key={posts.postId} className={styles.profilePlaylistImg}>
                    <img
                      src={posts.image}
                      alt={`Playlist ${posts.postId}`}
                      onClick={() => handleImageClick(posts.postId)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
const fetchUser = async (userId) => {
  try {
    const response = await fetch('/api/getuser', {
      // stores all post/playlist images
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
