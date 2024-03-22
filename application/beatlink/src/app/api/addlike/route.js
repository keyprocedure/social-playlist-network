import { addLike } from "../../../../helpers/database/controllers/postController";
import parseJSON from "../../../../helpers/parseJSON";

export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
        const body = await parseJSON(request);

        if (!body) {
            throw new Error("No Body Provided");
        }

        const { postId } = body;

        // Add like to post
        await addLike(postId);

        return Response.json({ message: "Like Added" });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}