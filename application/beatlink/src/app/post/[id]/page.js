"use client";

import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { IconButton } from "../../components/IconButton";
import { FiHeart } from "react-icons/fi";
import { FaRegShareSquare } from "react-icons/fa";
import { PiMagicWand } from "react-icons/pi";
import { CommentSubmit } from "../../components/PostPage/CommentSubmit";
import { ProfilePicture } from "../../components/ProfilePicture";
import { LikeButton } from "../../components/PostPage/LikeButton";
import { ProfileCard } from "../../components/PostPage/ProfileCard";
import { CommentCard } from "../../components/PostPage/CommentCard";

export default function PostPage({ params }) {
  return (
    // <CustomButton variant="outline" text={"Follow"}></CustomButton>
    // <IconButton icon={<PiMagicWand />} onClick={() => console.log("clicked")} contextValues={{ style: { height: "30px", width: "30px" } }} />
    <div>
      <CommentCard username={"Elon Musk"} comment={"Test"} />
      {/* <CommentSubmit params={params} /> */}
      {/* <LikeButton height={"50px"} width={"50px"} params={params} />i( */}
      {/* <ProfilePicture /> 
            <ProfilePicture src={"https://imageio.forbes.com/specials-images/imageserve/62d700cd6094d2c180f269b9/0x0.jpg?format=jpg&crop=959,959,x0,y0,safe&height=416&width=416&fit=bounds"}/> */}
    </div>

    // <IconButton icon={<SendButton />} />
  );
}
