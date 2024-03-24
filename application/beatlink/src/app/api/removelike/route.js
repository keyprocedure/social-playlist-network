import { removeLike } from "../../../../helpers/database/controllers/postController";
import parseJSON from "../../../../helpers/parseJSON";

export const dynamic = "force-dynamic";
export async function DELETE(request) {
    try {
        const body = await parseJSON(request);

        const { postId } = body;

        // Remove like from post
        await removeLike(postId);

        return Response.json({ message: "Like Removed" });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}