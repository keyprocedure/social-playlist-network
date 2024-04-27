import React, { useState, useEffect } from "react";
import styles from "../css/profile.module.scss";
import BackButton from "../PostPage/BackButton";
import Link from "next/link";
import apiClient from "../../../../helpers/libs/app";
import { useRouter } from "next/navigation";
import { Spinner } from "@chakra-ui/react";
import CheckSessionCookie from "../../../../helpers/hooks/CheckSessionCookie";
import Cookies from "js-cookie";

const ProfilePageLayout = () => {
  const isLoading = CheckSessionCookie();
  const [userData, setUserData] = useState(null);
  const [playlistImages, setPlaylistImages] = useState([]);
  const router = useRouter();

  const getData = async () => {
    try {
      const userId = await Cookies.get("userid");
      const response = await apiClient.post("/getuser", { userId });

      setUserData(response.user);
      setPlaylistImages(response.posts);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleImageClick = (id) => {
    router.push(`/post/${id}`);
  };

  return (
    <>
      {isLoading ? (
        // <div>Loading...</div>
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
                  <div>
                    <h2>
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
    </>
  );
};

export default ProfilePageLayout;
