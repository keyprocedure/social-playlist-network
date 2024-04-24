import React, { useState, useEffect } from 'react'
import styles from '../css/profile.module.scss'
import BackButton from '../PostPage/BackButton'
import Link from 'next/link'
import apiClient from '../../../../helpers/libs/app'
import { useRouter } from 'next/navigation'
import { Spinner } from '@chakra-ui/react'

const ProfilePageLayout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  const userId = '661b473939b29ce703b92d93'

  const getData = async () => {
    try {
      const response = await apiClient.post('/getuser', { userId })
      console.log('data of all', response)
      setUserData(response)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleImageClick = () => {
    router.push('/post/jfjhasfbhasbf')
  }

  return (
    <>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
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
                {userData && (
                  <div className={styles.profileTopLeft}>
                    <div className={styles.profileTopLeftImg}>
                      <img src={userData.userImage} alt="PROFILE" />
                    </div>
                    <div className={styles.profileTopLeftText}>
                      <h2>{userData.username}</h2>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                )}
                <div style={{ width: '50%' }}>
                  This is a simple generator that you can use to make fonts for
                  Instagram. Simply put your normal text in the first box and
                  fonts for Instagram bio/captions/etc.
                </div>
              </div>
              <div className={styles.profileTopRightMain}>
                <div className={styles.profileTopRight}>
                  <div>
                    <h2>
                      {(userData.playlists && userData.playlists.length) || 0}
                    </h2>
                    <p>Posts</p>
                  </div>
                  <div>
                    <h2>
                      {(userData.followers && userData.followers.length) || 0}
                    </h2>
                    <p>Followers</p>
                  </div>
                  <div>
                    <h2>
                      {(userData.following && userData.following.length) || 0}
                    </h2>
                    <p>Following</p>
                  </div>
                </div>
                <div className={styles.profileFollow}>
                  <div className={styles.profileCenterOpt}>
                    <Link href="">
                      <p>Edit Profile</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.profileCenterMain}></div>
            <div className={styles.profileBottomMain}>
              <div
                className={styles.profileImagesPlay}
                style={{ display: 'flex', gap: '10px' }}
              >
                <div className={styles.profilePlaylistImg}>
                  <img src="/play.png" alt="image" onClick={handleImageClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfilePageLayout
