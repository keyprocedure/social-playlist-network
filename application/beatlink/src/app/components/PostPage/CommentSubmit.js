import React, { useState } from "react";
import { IconButton } from "../IconButton";
// import { LuMessageSquarePlus } from "react-icons/lu";
import { SendButton } from "../SendButton";
import "../css/CommentSubmit.css";

export function CommentSubmit({ post, handleCommentSubmission, user }) {
  const [comment, setComment] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();

    if (comment) {
      const postId = post.id;
      const userId = user._id;
      const username = user.username;
      const userImage = user.userImage;

      const commentObject = { postId, userId, username, userImage, comment };

      // Sample API Request
      await fetch("/api/addcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentObject),
      });

      setComment("");
      handleCommentSubmission(commentObject); // re-renders page
    }
  }

  function handleChange(event) {
    setComment(event.target.value);
  }

  return (
    <div className="comment-container">
      <form>
        <div className="flex-container">
          <input
            className="comment-input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleChange}
          />
          <IconButton
            className={"send-button"}
            icon={<SendButton width={"30px"} height={"30px"} />}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}
