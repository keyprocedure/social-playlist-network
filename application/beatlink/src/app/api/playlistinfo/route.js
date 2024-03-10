import signale from "signale";
import { buildPlaylistObject } from "../../../../helpers/spotifyHelper";
import { createPlaylist } from "../../../../helpers/database/controllers/playlistController";

export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
        const body = await parseJSON(request);

        if (!body) {
            throw new Error("No Body Provided");
        }

        const { playlistURL } = body;

        const playlistObject = await buildPlaylistObject(playlistURL);

        // Add playlist to DB
        await createPlaylist(playlistObject);

        return Response.json(playlistObject);
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
