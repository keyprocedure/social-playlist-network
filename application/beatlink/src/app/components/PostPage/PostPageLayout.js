import React, { useEffect, useState } from "react";
import { AIRecommendation } from "./AIRecommendation";
import PostImage from "./PostImage";
import ShareButton from "./ShareButton";
import BackButton from "./BackButton";
import { ProfileCard } from "./ProfileCard";
import { LikeButton } from "./LikeButton";
import { CommentSubmit } from "./CommentSubmit";
import { VerticalLine } from "./VerticalLine";
import { CustomButton } from "../CustomButton";
import Navbar from "../navbar";
import "../css/PostPageLayout.css";
import { CommentCard } from "./CommentCard";

//FIX: Change user ID with username, add a way to convert the ID to a username
export default function PostPageLayout({ playlist, post }) {
  const [comments, setComments] = useState(post.comments);
  const [follow, setFollow] = useState("Follow");

  async function handleFollow() {
    if (follow === "Followed") {
      return setFollow("Follow");
    }

    setFollow("Followed");
  }

  function handleCommentSubmission(comment) {
    setComments([...comments, comment]);
  }

  return (
    <>
      <Navbar />
      <div className="page-grid-container">
        <div className="back-button">
          <BackButton width={"40px"} height={"40px"} />
        </div>
        <div className="posted-by">
          <ProfileCard
            primaryText={"Posted by:"}
            primaryTextColor={"grey"}
            secondaryText={post.user_id}
            secondaryTextColor={"grey"}
          />
        </div>
        <div className="post-area">
          <div className="post-title">
            {post.postTitle}
            <CustomButton
              className={"btn btn-dark follow-btn"}
              text={follow}
              onClick={handleFollow}
            />
          </div>
          <div className="post-content">
            <PostImage playlist={playlist} />
          </div>
          <div className="post-interactions">
            <div className="ai-button">
              <AIRecommendation
                playlist={playlist}
                width={"40px"}
                height={"40px"}
              />
            </div>
            <div className="share-button">
              <ShareButton width={"30px"} height={"30px"} />
            </div>
            <div className="like-button">
              <LikeButton width={"33px"} height={"33px"} post={post} />
            </div>
          </div>
        </div>
        <div className="vertical-line">
          <VerticalLine />
        </div>
        <div className="comment-section">
          {/* add section for comments */}
          {comments.map((comment, id) => {
            return (
              <div key={id}>
                <CommentCard
                  username={comment.userId}
                  comment={comment.comment}
                />
              </div>
            );
          })}
        </div>
        <div className="comment-submission">
          <CommentSubmit
            post={post}
            handleCommentSubmission={handleCommentSubmission}
          />
        </div>
      </div>
    </>
  );
}
