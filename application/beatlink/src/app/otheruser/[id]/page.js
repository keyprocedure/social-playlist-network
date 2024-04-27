"use client";
import React, { useState, useEffect } from "react";
// import OtherUserPageLayout from "../../components/OtherUser/OtherUserLayout";
import dynamic from "next/dynamic";
import apiClient from "../../../../helpers/libs/app.js";
import Cookies from "js-cookie";
import ProfilePageLayout from "../../components/Profile/ProfilePageLayout.js";
import Navbar from "../../components/navbar.js";

const OtherUserPageLayout = dynamic(() =>
  import("../../components/OtherUser/OtherUserLayout")
);

export default function OtherUserProfile({ params }) {
  const userId = params.id;
  const [userData, setUserData] = useState(null);
  const [playlistImages, setPlaylistImages] = useState([]);
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const userid = await Cookies.get("userid");
      setUser(userid)
      const response = await apiClient.post("/getuser", { userId });

      setUserData(response.user);
      setPlaylistImages(response.posts);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <div>
      <Navbar/>
      {userData ? (
        userData?._id == user ? <ProfilePageLayout /> : <OtherUserPageLayout
          userData={userData}
          playlistImages={playlistImages}
          fetchData={fetchData}
          userId={user}
        />


      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
