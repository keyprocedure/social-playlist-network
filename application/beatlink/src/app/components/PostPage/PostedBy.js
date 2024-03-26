import React from "react";
import { ProfilePicture } from "../ProfilePicture";
import "../css/PostedBy.css";

export function PostedBy({ name }) {
  return (
    <div className="grid-container">
      <div className="profile-picture">
        <ProfilePicture width={50} height={50} />
      </div>
      <div className="posted-by text-body-secondary small-text">Posted By:</div>
      <div className="username text-body-secondary small-text">{name}</div>
    </div>
  );
}
