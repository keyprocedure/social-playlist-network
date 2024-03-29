import React from "react";
import { AIRecommendation } from "./AIRecommendation";
import PostImage from "./PostImage";
import ShareButton from "./ShareButton";
import BackButton from "./BackButton";
import { ProfileCard } from "./ProfileCard";
import { LikeButton } from "./LikeButton";
import { CommentSubmit } from "./CommentSubmit";
import { VerticalLine } from "./VerticalLine";
import { CustomButton } from "../CustomButton";

import "../css/PostPageLayout.css";

export default function PostPageLayout({ playlist, post }) {
    return (
        <div className="page-grid-container">
            {/* <AIRecommendation playlist={playlist} /> */}
            {/* <PostImage playlist={playlist} /> */}
            {/* <ShareButton /> */}
            <div className="back-button">
                <BackButton width={"40px"} height={"40px"} />
            </div>
            <div className="posted-by">
                <ProfileCard primaryText={"Posted by:"} primaryTextColor={"grey"} secondaryText={post.user_id} secondaryTextColor={"grey"} />
            </div>
            <div className="post-area">
                <div className="post-title">
                    {post.postTitle}
                    <CustomButton className={"btn btn-dark follow-btn"} text={"Follow"} onClick={() => window.open(playlist.external_urls.spotify)} />
                </div>
                <div className="post-content">
                    <PostImage playlist={playlist} />
                </div>
                <div className="post-interactions">
                    <div className="like-button">
                        <LikeButton post={post} width={"30px"} height={"30px"} />
                    </div>
                    <div className="share-button">
                        <ShareButton width={"30px"} height={"30px"} />
                    </div>
                    <div className="ai-button">
                        <AIRecommendation playlist={playlist} width={"40px"} height={"40px"} />
                    </div>
                </div>
            </div>
            <div className="vertical-line">
                <VerticalLine width={"1px"} height={"550px"} />
            </div>
            <div className="comment-section">
                {/* add section for comments */}
            </div>
            <div className="comment-submission">
                <CommentSubmit post={post} />
            </div>
            {/* <div class */}
        </div>
    );
}