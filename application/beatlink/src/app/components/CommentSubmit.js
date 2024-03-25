import React, { useState } from "react";
import { IconButton } from "./IconButton";
// import { LuMessageSquarePlus } from "react-icons/lu";
import { SendButton } from "./SendButton";
import "./css/CommentSubmit.css";

export function CommentSubmit({ params }) {

    const [comment, setComment] = useState("");
    async function handleSubmit(event) {
        event.preventDefault();

        const postId = params.id;
        const userId = "root"; // Hardcoded for now

        // Sample API Request
        await fetch("/api/addcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postId, userId, comment })
        });
    }

    function handleChange(event) {
        setComment(event.target.value);
    }

    return (
        <div className="comment-container">
            <form>
                <input type="text" placeholder="Add a comment..." onChange={handleChange} />
                <IconButton icon={<SendButton />} onClick={handleSubmit} contextValues={{ style: { height: "30px", width: "30px" } }} />
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