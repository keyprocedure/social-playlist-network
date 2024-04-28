import React, { useState, useEffect } from "react";
import styles from "../css/profile.module.scss";
import BackButton from "../PostPage/BackButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "@chakra-ui/react";
import CheckSessionCookie from "../../../../helpers/hooks/CheckSessionCookie";
import Cookies from "js-cookie";
import { ListGroup, Modal } from "react-bootstrap";
import { CustomButton } from "../CustomButton";

const ProfilePageLayout = () => {
  const isLoading = CheckSessionCookie();
  const [userData, setUserData] = useState(null);
  const [playlistImages, setPlaylistImages] = useState([]);
  const [title, seTitle] = useState(false);
  const [getfollower, setGetfollower] = useState([]);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const getData = async () => {
    try {
      const userId = await Cookies.get("userid");
      const response = await fetch("/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      });
      if (response) {
        const responseData = await response.json();
        setUserData(responseData.user);
        setPlaylistImages(responseData.posts);
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleImageClick = (id) => {
    router.push(`/post/${id}`);
  };
  async function followData(get) {
    try {
      const userId = await Cookies.get("userid");
      const follow = get ? "followers" : "following";
      {
        get ? seTitle(true) : seTitle(false);
      }
      const input = {
        follow: follow,
        userId: userId,
      };
      const response = await fetch("/api/following-followers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (response) {
        const responseData = await response.json();
        setGetfollower(responseData);
        setShow(true);
      }
    } catch (error) {
      console.error("An error occurred during the follow process", error);
      return { success: false, error: error.message };
    }
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
              style={{ justifyContent: "flex-start" }}
            >
              <BackButton width={"40px"} height={"40px"} />
            </div>

            <div className={styles.profileTopMain}>
              <div className={styles.profileLeftMain}>
                {userData && (
                  <div className={styles.profileTopLeft}>
                    <div className={styles.profileTopLeftImg}>
                      {/* <img src={userData?.userImage} alt="PROFILE" /> */}
                      {userData.userImage ? (
                        <img src={userData.userImage} alt="PROFILE" />
                      ) : (
                        <img src="/default.jpg" alt="Default Profile" />
                      )}
                    </div>
                    <div className={styles.profileTopLeftText}>
                      <h2>{userData?.username}</h2>
                      <p>{userData?.email}</p>
                    </div>
                  </div>
                )}
                <div style={{ width: "50%" }}>{userData?.bio}</div>
                <div style={{ width: "50%" }}>{userData?.status}</div>
              </div>
              <div className={styles.profileTopRightMain}>
                <div className={styles.profileTopRight}>
                  <div>
                    <h2>{(playlistImages && playlistImages?.length) || 0}</h2>
                    <p>Posts</p>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      followData(true);
                    }}
                  >
                    <h2>
                      {(userData?.followers && userData?.followers.length) || 0}
                    </h2>
                    <p>Followers</p>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      followData(false);
                    }}
                  >
                    <h2>
                      {(userData?.following && userData?.following.length) || 0}
                    </h2>
                    <p>Following</p>
                  </div>
                </div>
                <div className={styles.profileFollow}>
                  <div className={styles.profileCenterOpt}>
                    <Link href="/usersettings">
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
                style={{
                  display: "grid",
                  gap: "10px",
                  gridTemplateColumns: "repeat(5,1fr)",
                }}
              >
                {/* <div className={styles.profilePlaylistImg}>
                  <img src="/play.png" alt="image" onClick={handleImageClick} />
                </div> */}
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
      )}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title ? "Followers" : "Following"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <ListGroup>
            {getfollower.length === 0
              ? `${title ? "Followers" : "Following"} Not Exist`
              : getfollower.map((follower, index) => (
                  <div key={index}>
                    <ListGroup.Item>
                      {follower.userImage ? (
                        <img
                          src={follower.userImage}
                          alt="PROFILE"
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "1%",
                          }}
                        />
                      ) : (
                        <img
                          src="/default.jpg"
                          alt="Default Profile"
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "1%",
                          }}
                        />
                      )}

                      {follower.username}
                    </ListGroup.Item>
                  </div>
                ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text={"Close"} onClick={() => setShow(false)} />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfilePageLayout
