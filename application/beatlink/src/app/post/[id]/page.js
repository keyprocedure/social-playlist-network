'use client'

import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { IconButton } from "../../components/IconButton";
import { FiHeart } from "react-icons/fi";
import { FaRegShareSquare } from "react-icons/fa";
import { PiMagicWand } from "react-icons/pi";


export default function PostPage() {
    return (
        // <CustomButton variant="outline" text={"Follow"}></CustomButton>
        <IconButton icon={<PiMagicWand />} onClick={() => console.log("clicked")} contextValues={{ style: { height: "30px", width: "30px" } }} />
    );
}