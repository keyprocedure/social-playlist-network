import { addComment } from "../../../../helpers/database/controllers/postController";
import { requestWrapper } from "../../../../helpers/requestWrapper";

export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
        const body = await parseJSON(request);

        const { postId, userId, comment } = body;

        // Add comment to post
        await addComment({ postId, userId, comment });

        return Response.json({ message: "Comment Added" });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
