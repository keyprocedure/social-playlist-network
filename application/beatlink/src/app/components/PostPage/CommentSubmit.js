import React, { useState } from "react";
import { IconButton } from "../IconButton";
// import { LuMessageSquarePlus } from "react-icons/lu";
import { SendButton } from "../SendButton";
import "../css/CommentSubmit.css";

export function CommentSubmit({ post, handleCommentSubmission }) {
	const [comment, setComment] = useState("");
	async function handleSubmit(event) {
		event.preventDefault();

		const postId = post.id;
		const userId = "root"; // Hardcoded for now

		const commentObject = { postId, userId, comment };

		// Sample API Request
		await fetch("/api/addcomment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(commentObject),
		});

		handleCommentSubmission(commentObject); // re-renders page
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
		// <div>
		//     <form>
		//         <input type="text" placeholder="Enter your comment" />
		//         <button type="submit">Submit</button>
		//     </form>
		// </div>
	);
}
