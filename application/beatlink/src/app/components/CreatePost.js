"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import "./css/CreatePostButton.css";

async function CreatePostApi(
  postTitle,
  spotifyLink,
  description,
  userId,
  playlistId,
) {
  try {
    const response = await fetch("/api/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postTitle,
        spotifyLink,
        description,
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

export default function CreatePost() {
  const router = useRouter();
  const [postTitle, setPostTitle] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const userId = "";
  const playlistId = "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postTitle || !spotifyLink || !description) {
      setError("All fields are necessary to create a post.");
      return;
    }

    const response = await CreatePostApi(
      postTitle,
      spotifyLink,
      description,
      userId,
      playlistId,
    );

    if (response.success) {
      router.push("/home"); // Redirect
    } else {
      setError(response.error || "Creating Post failed. Try again.");
    }
  };

  return (
    <>
      <div
        style={{
          margin: "20px",
          backgroundColor: "rgba(255, 255, 255, .75)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
          <div>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <br />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </>
  );
}
