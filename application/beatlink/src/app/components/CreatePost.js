"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton.js";
import CustomAlert from "./CustomAlert";
import "../components/css/CreatePostLayout.css";

import Cookies from "js-cookie";

export default function CreatePost() {
  const router = useRouter();
  const [postTitle, setPostTitle] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //TODO: Fix this when auth is done
  const userId = Cookies.get("userid"); // hard-coded values for now since our app can't distinguish who's logged in yet

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postTitle || !spotifyLink) {
      return setError("All fields are necessary to create a post.");
    }
    // https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=205f55c17ce94a28

    if (!spotifyLink.startsWith("https://open.spotify.com/playlist")) {
      return setError("Not a valid Spotify Playlist URL");
    }

    const playlistId = spotifyLink.split("/playlist/")[1].split("?")[0];

    setIsLoading(true);

    const response = await CreatePostApi(
      postTitle,
      spotifyLink,
      userId,
      playlistId,
    );

    if (response.success) {
      router.push(`post/${response.data.postId}`); // Redirect
    } else {
      setError(response.error || "Creating Post failed. Try again.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="post-grid-container">
        <div className="post-title d-flex justify-content-center align-items-start">
          <h1>Create Post</h1>
        </div>
        <div className="post-form d-flex justify-content-center">
          <div className="form-container">
            <div className="d-flex flex-column">
              <div className="input-group mb-3">
                <CustomInput
                  type={"text"}
                  placeholderText={"Post Title"}
                  className={"form-control"}
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                ></CustomInput>
              </div>

              <div className="input-group mb-3">
                <CustomInput
                  type={"url"}
                  placeholderText={"Spotify Playlist Link"}
                  className={"form-control"}
                  value={spotifyLink}
                  onChange={(e) => setSpotifyLink(e.target.value)}
                ></CustomInput>
              </div>

              <CustomButton
                text={isLoading ? "Creating Post..." : "Create Post"}
                //text={"Create Post"}
                className={"btn btn-dark post-btn"}
                onClick={handleSubmit}
                disabled={isLoading}
              ></CustomButton>

              {error && (
                <CustomAlert text={error} type={"danger"} className={"mt-3"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function CreatePostApi(postTitle, spotifyLink, userId, playlistId) {
  try {
    const response = await fetch("/api/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postTitle,
        spotifyLink,
        user_id: userId,
        playlist_id: playlistId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Create Post failed. Try again");
    }

    return { success: true, data };
  } catch (error) {
    console.error("An error occurred during the creating process", error);
    return { success: false, error: error.message };
  }
}
