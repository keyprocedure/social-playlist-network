import { deletePlaylist } from "../../../../helpers/database/controllers/playlistController";

export const dynamic = "force-dynamic";
export async function DELETE(request) {
    try {
        const body = await parseJSON(request);

        if (!body) {
            throw new Error("No Body Provided");
        }

        const { playlistId } = body;

        await deletePlaylist(playlistId);

        return Response.json({ success: true });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

async function parseJSON(request) {
    const contentType = request.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const body = await request.json();
        return body;
    } else {
        return null;
    }
}