import { getPost } from "../../../../../helpers/database/controllers/postController";

export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
    try {
        const postId = params.postId;
        const post = await getPost(postId);

        if (!post) {
            return Response.json({ error: "Post not found" }, { status: 400 });
        }

        return Response.json(post);
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}