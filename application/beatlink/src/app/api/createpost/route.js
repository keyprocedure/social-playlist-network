import { createPost } from "../../../../helpers/database/controllers/postController";
import { requestWrapper } from "../../../../helpers/requestWrapper";

export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
        const body = await parseJSON(request);

        const { postTitle, user_id, playlist_id } = body;

        // Add post to DB
        await createPost({ postTitle, user_id, playlist_id });

        return Response.json({ message: "Post Created" });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }

}