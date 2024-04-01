"use client";
import React, { useState, useEffect, Suspense } from "react";
// import { CustomButton } from "../../components/CustomButton";
// import { IconButton } from "../../components/IconButton";
// import { CommentSubmit } from "../../components/PostPage/CommentSubmit";
// import { ProfilePicture } from "../../components/ProfilePicture";
// import { LikeButton } from "../../components/PostPage/LikeButton";
// import { ProfileCard } from "../../components/PostPage/ProfileCard";
// import { CommentCard } from "../../components/PostPage/CommentCard";
// import { AIRecommendation } from "../../components/PostPage/AIRecommendation";
// import { Playlist } from "../../components/PostPage/Playlist";
// import { Spinner } from "react-bootstrap";
import PostPageLayout from "../../components/PostPage/PostPageLayout";

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

  //const playlistId = await getPlaylistFromPost(postId);
  //const playlist = await getPlaylist(playlistId);

  //console.log("PlaylistID: ", playlistId);
  //console.log("Playlist: ", playlist);
  return (
    // <CustomButton variant="outline" text={"Follow"}></CustomButton>
    // <IconButton icon={<PiMagicWand />} onClick={() => console.log("clicked")} contextValues={{ style: { height: "30px", width: "30px" } }} />
    <div>
      {/* <h1>Test</h1> */}
      {/* <Playlist postId={postId} /> */}
      {playlist && post ? <PostPageLayout playlist={playlist} post={post} /> : <p>Loading...</p>}

      {/* {playlist && <AIRecommendation playlist={playlist} />} */}
      {/* <LikeButton width={"50px"} height={"50px"} params={params} /> */}
      {/* <CommentSubmit params={params} /> */}
      {/* <LikeButton height={"50px"} width={"50px"} params={params} />i( */}
      {/* <ProfilePicture /> 
      <LikeButton width={"50px"} height={"50px"} />
            <ProfilePicture src={"https://imageio.forbes.com/specials-images/imageserve/62d700cd6094d2c180f269b9/0x0.jpg?format=jpg&crop=959,959,x0,y0,safe&height=416&width=416&fit=bounds"}/> */}
    </div>

    // <IconButton icon={<SendButton />} />
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
