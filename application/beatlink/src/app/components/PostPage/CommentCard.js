import React from "react";
import { ProfilePicture } from "../ProfilePicture";

export function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <div className="profile-picture">
        <ProfilePicture width={50} height={50} />
      </div>
      <div className="comment-text">{comment}</div>
    </div>
  );
}
