import React, { useState } from "react";
import { IconButton } from "../IconButton";
import "../css/LikeButton.css";

export function LikeButton({ width, height, post }) {

    const [fill, setFill] = useState("none");
    const [likes, setLikes] = useState(post.likes);



    async function handleClick() {
        const postId = post.id;

        if (fill === "none") {
            setFill("red");

            await fetch("/api/addlike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId }),
            });

            setLikes(likes + 1);
        } else {
            setFill("none");

            await fetch("/api/removelike", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId }),
            });
            setLikes(likes - 1);
        }

    }

    return (
        <div className="like-button">
            <div className="flex-container">
                <IconButton icon={likeSVG({ width, height, fill })} onClick={handleClick} />
                <p>{likes}</p>
            </div>

        </div>
    );
}

function likeSVG({ width, height, fill }) {
    return (
        <svg width={width} height={height} viewBox="0 0 20 17" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6066 9.53553L10.9497 15.1924C10.1687 15.9734 8.90237 15.9734 8.12132 15.1924L2.46447 9.53553C0.511845 7.58291 0.511845 4.41709 2.46447 2.46447C4.41709 0.511845 7.58291 0.511845 9.53553 2.46447C11.4882 0.511845 14.654 0.511845 16.6066 2.46447C18.5592 4.41709 18.5592 7.58291 16.6066 9.53553Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}