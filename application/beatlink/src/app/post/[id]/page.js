"use client";
import React, { useState, useEffect } from "react";
import PostPageLayout from "../../components/PostPage/PostPageLayout";
import Navbar from "../../components/navbar";
import CheckSessionCookie from "../../../../helpers/hooks/CheckSessionCookie";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function PostPage({ params }) {
  const postId = params.id;

  const [playlist, setPlaylist] = useState(null);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const noSessionCookieSet = CheckSessionCookie();

  useEffect(() => {
    // If session cookie exists, (noSessionCookieSet = false) then render the page and make requests
    if (!noSessionCookieSet) {
      // This code redirects to the homepage if the post ID doesn't exist
      new Promise((resolve, reject) => {
        Promise.all([
          fetchPlaylistFromPostId(postId),
          fetchPostFromPostId(postId),
          fetchUser(Cookies.get("userid")),
        ])
          .then(([playlist, post, user]) => {
            setPlaylist(playlist);
            setPost(post);
            setUser(user);

            return fetchUser(post.user_id);
          })
          .then((author) => {
            setAuthor(author);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      }).catch(() => router.push("/"));
    }
  }, [postId, noSessionCookieSet, router]);

  return (
    <div>
      <Navbar />
      {playlist && post && author && user ? (
        <PostPageLayout
          playlist={playlist}
          post={post}
          author={author}
          user={user}
        />
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

async function fetchUser(userId) {
  const response = await fetch("/api/getuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error(data.error);
  }

  return response.json();
}
