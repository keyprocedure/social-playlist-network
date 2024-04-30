'use client'
import React, { useState } from 'react'
import styles from '../css/profile.module.scss'
import BackButton from '../PostPage/BackButton'
import { useRouter } from 'next/navigation'

export default function OtherUserPageLayout({
  userData,
  playlistImages,
  fetchData,
  userId,
}) {
  const user = userData.followers.includes(userId)
  const [isFollowing, setIsFollowing] = useState(user)
  const router = useRouter()

  const handleImageClick = (id) => {
    router.push(`/post/${id}`)
  }

  async function follow() {
    try {
      const input = {
        userId,
        followId: userData._id,
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
      fetchData && (await fetchData())

      setIsFollowing(!!isFollowing)
      return { success: true }
    } catch (error) {
      console.error('An error occurred during the follow process', error)
      return { success: false, error: error.message }
    }
  }
  return (
    <>
      <div className={styles.profileMainDiv}>
        <div className={styles.profileContainer}>
          <div className="back-button">
            <BackButton width={'40px'} height={'40px'} />
          </div>
          <div className={styles.profileTopMain}>
            <div className={styles.profileLeftMain}>
              <div className={styles.profileTopLeft}>
                <div className={styles.profileTopLeftImg}>
                  {userData.userImage ? (
                    <img src={userData.userImage} alt="PROFILE" />
                  ) : (
                    <img src="/defaultprofile.png" alt="Default Profile" />
                  )}
                </div>
                <div className={styles.profileTopLeftText}>
                  <h2>{userData?.username}</h2>
                  <p>{userData?.email}</p>
                </div>
              </div>
              <div style={{ width: '50%' }}>{userData?.bio}</div>
            </div>
            <div className={styles.profileTopRightMain}>
              <div className={styles.profileTopRight}>
                <div>
                  <h2>
                    <h2>{(playlistImages && playlistImages?.length) || 0}</h2>
                  </h2>
                  <p>Posts</p>
                </div>
                <div>
                  {/* <h2>{followersCount}</h2> */}
                  <h2>
                    {' '}
                    {(userData?.followers && userData?.followers.length) || 0}
                  </h2>
                  <p>Followers</p>
                </div>
                <div>
                  <h2>
                    {(userData?.following && userData?.following.length) || 0}
                  </h2>
                  <p>Following</p>
                </div>
              </div>
              <div className={styles.profileFollow}>
                <p onClick={follow}>{isFollowing ? 'Following' : 'Follow'}</p>
                {/* <p>Message</p> */}
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
              {playlistImages.map((posts, index) => (
                <div key={index} className={styles.profilePlaylistImg}>
                  <img
                    src={posts.image}
                    alt={`Playlist ${index}`}
                    onClick={() => handleImageClick(posts.postId)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const OtherUserPageLayout = async ({
//   userData,
//   playlistImages,
//   fetchData,
//   userId,
// }) => {
//   const user = userData.followers.includes(userId)
//   const [isFollowing, setIsFollowing] = useState(user)
//   const router = useRouter()
//
//   const handleImageClick = (id) => {
//     router.push(`/post/${id}`)
//   }
//
//   async function follow() {
//     try {
//       const input = {
//         userId,
//         followId: userData._id,
//       }
//
//       const response = await fetch('/api/follow', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(input),
//       })
//       if (!response.ok) {
//         throw new Error('Follow user failed. Try again')
//       }
//       fetchData && (await fetchData())
//
//       setIsFollowing(!!isFollowing)
//       return { success: true }
//     } catch (error) {
//       console.error('An error occurred during the follow process', error)
//       return { success: false, error: error.message }
//     }
//   }
//   return (
//     <>
//       <div className={styles.profileMainDiv}>
//         <div className={styles.profileContainer}>
//           <div className="back-button">
//             <BackButton width={'40px'} height={'40px'} />
//           </div>
//           <div className={styles.profileTopMain}>
//             <div className={styles.profileLeftMain}>
//               <div className={styles.profileTopLeft}>
//                 <div className={styles.profileTopLeftImg}>
//                   {userData.userImage ? (
//                     <img src={userData.userImage} alt="PROFILE" />
//                   ) : (
//                     <img src="/defaultprofile.png" alt="Default Profile" />
//                   )}
//                 </div>
//                 <div className={styles.profileTopLeftText}>
//                   <h2>{userData?.username}</h2>
//                   <p>{userData?.email}</p>
//                 </div>
//               </div>
//               <div style={{ width: '50%' }}>{userData?.bio}</div>
//             </div>
//             <div className={styles.profileTopRightMain}>
//               <div className={styles.profileTopRight}>
//                 <div>
//                   <h2>
//                     <h2>{(playlistImages && playlistImages?.length) || 0}</h2>
//                   </h2>
//                   <p>Posts</p>
//                 </div>
//                 <div>
//                   {/* <h2>{followersCount}</h2> */}
//                   <h2>
//                     {' '}
//                     {(userData?.followers && userData?.followers.length) || 0}
//                   </h2>
//                   <p>Followers</p>
//                 </div>
//                 <div>
//                   <h2>
//                     {(userData?.following && userData?.following.length) || 0}
//                   </h2>
//                   <p>Following</p>
//                 </div>
//               </div>
//               <div className={styles.profileFollow}>
//                 <p onClick={follow}>{isFollowing ? 'Following' : 'Follow'}</p>
//                 {/* <p>Message</p> */}
//               </div>
//             </div>
//           </div>
//           <div className={styles.profileCenterMain}></div>
//           <div className={styles.profileBottomMain}>
//             <div
//               className={styles.profileImagesPlay}
//               style={{
//                 display: 'grid',
//                 gap: '10px',
//                 gridTemplateColumns: 'repeat(5,1fr)',
//               }}
//             >
//               {playlistImages.map((posts, index) => (
//                 <div key={index} className={styles.profilePlaylistImg}>
//                   <img
//                     src={posts.image}
//                     alt={`Playlist ${index}`}
//                     onClick={() => handleImageClick(posts.postId)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
//
// export default OtherUserPageLayout
