import React from "react";
import { AIRecommendation } from "./AIRecommendation";
import ImageBlur from "./ImageBlur";

export default function PostPageLayout({ playlist }) {
    return (
        <div>
            {/* <AIRecommendation playlist={playlist} /> */}
            <ImageBlur playlist={playlist} />
        </div>
    );
}