import { addComment } from "../../../../helpers/database/controllers/postController";
import parseJSON from "../../../../helpers/parseJSON";

export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
        const body = await parseJSON(request);

        if (!body) {
            throw new Error("No Body Provided");
        }

        const { postId, userId, comment } = body;

        // Add comment to post
        await addComment(postId, { userId, comment });

        return Response.json({ message: "Comment Added" });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
