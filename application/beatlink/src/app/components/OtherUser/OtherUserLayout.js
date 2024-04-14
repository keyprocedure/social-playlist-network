import React, { useState, useEffect } from "react";
import styles from "../css/profile.module.scss";
import BackButton from "../PostPage/BackButton";

const OtherUserPageLayout = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(21);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowersCount((prevCount) => prevCount - 1);
    } else {
      setFollowersCount((prevCount) => prevCount + 1);
    }
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.profileMainDiv}>
        <div className={styles.profileContainer}>
          <div className="back-button">
            <BackButton width={"40px"} height={"40px"} />
          </div>
          <div className={styles.profileTopMain}>
            <div className={styles.profileLeftMain}>
              <div className={styles.profileTopLeft}>
                <div className={styles.profileTopLeftImg}>
                  <img src="/default.jpg" alt="profile" />
                </div>
                <div className={styles.profileTopLeftText}>
                  <h2>ScatterHold</h2>
                  <p>Scatter</p>
                </div>
              </div>
              <div style={{ width: "50%" }}>
                This is a simple generator that you can use to make fonts for
                Instagram. Simply put your normal text in the first box and
                fonts for Instagram bio/captions/etc.
              </div>
            </div>
            <div className={styles.profileTopRightMain}>
              <div className={styles.profileTopRight}>
                <div>
                  <h2>4</h2>
                  <p>Posts</p>
                </div>
                <div>
                  <h2>{followersCount}</h2>
                  <p>Followers</p>
                </div>
                <div>
                  <h2>10</h2>
                  <p>Following</p>
                </div>
              </div>
              <div className={styles.profileFollow}>
                <p onClick={handleFollowToggle}>
                  {isFollowing ? "Following" : "Follow"}
                </p>
                <p>Message</p>
              </div>
            </div>
          </div>
          <div className={styles.profileCenterMain}></div>
          <div className={styles.profileBottomMain}>
            <div
              className={styles.profileImagesPlay}
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div className={styles.profilePlaylistImg}>
                <img src="/play.png" />
              </div>
              <div className={styles.profilePlaylistImg}>
                <img src="/play1.png" />
              </div>
              <div className={styles.profilePlaylistImg}>
                <img src="/play2.png" />
              </div>
              <div className={styles.profilePlaylistImg}>
                <img src="/play3.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserPageLayout;
