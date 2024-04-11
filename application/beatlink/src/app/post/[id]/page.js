"use client";
import React, { useState, useEffect } from "react";
import PostPageLayout from "../../components/PostPage/PostPageLayout";
import Navbar from "../../components/navbar";

export default function PostPage({ params }) {
  const postId = params.id;

  const [playlist, setPlaylist] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPlaylistFromPostId(postId).then((playlist) => {
      setPlaylist(playlist);
    });
    fetchPostFromPostId(postId).then((post) => {
      setPost(post);
    });
  }, [postId]);

  return (
    <div>
      <Navbar />
      {playlist && post ? (
        <PostPageLayout playlist={playlist} post={post} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

async function fetchPlaylistFromPostId(postId) {
  const response = await fetch(`/api/getplaylist/post/${postId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch playlist");
  }

  return response.json(); // responseJSON;
}

async function fetchPostFromPostId(postId) {
  const response = await fetch(`/api/getpost/${postId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
}
