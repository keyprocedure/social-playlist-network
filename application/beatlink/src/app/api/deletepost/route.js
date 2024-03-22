import { deletePost } from "../../../../helpers/database/controllers/postController";
import parseJSON from "../../../../helpers/parseJSON";

export const dynamic = "force-dynamic";
export async function DELETE(request) {
    try {
        const body = await parseJSON(request);

        if (!body) {
            throw new Error("No Body Provided");
        }

        const { postId } = body;

        // Delete post from DB
        await deletePost(postId);

        return Response.json({ message: "Post Deleted" });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}