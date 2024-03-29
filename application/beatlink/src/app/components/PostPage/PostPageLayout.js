import React from "react";
import { AIRecommendation } from "./AIRecommendation";
import PostImage from "./PostImage";
import ShareButton from "./ShareButton";
import BackButton from "./BackButton";
export default function PostPageLayout({ playlist }) {
    return (
        <div>
            {/* <AIRecommendation playlist={playlist} /> */}
            {/* <PostImage playlist={playlist} /> */}
            {/* <ShareButton /> */}
            <BackButton width={"40px"} height={"40px"} />
        </div>
    );
}