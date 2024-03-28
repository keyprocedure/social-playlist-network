import React from "react";
import { AIRecommendation } from "./AIRecommendation";

export default function PostPageLayout({ playlist }) {
    return (
        <div>
            <AIRecommendation playlist={playlist} />
        </div>
    );
}