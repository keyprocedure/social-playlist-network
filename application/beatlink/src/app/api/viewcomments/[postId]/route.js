import { getAllComments } from "../../../../../helpers/database/controllers/postController";

export const dynamic = "force-dynamic";
export async function GET(request, context) {
    try {
        const postId = context.params.postId;
        
        // Get all comments for post
        const comments = await getAllComments(postId);

        return Response.json(comments);
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}