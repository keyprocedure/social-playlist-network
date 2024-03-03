import signale from "signale";
import { buildPlaylistObject } from "../../../../helpers/spotifyHelper";

export const dynamic = "force-dynamic"
export async function POST(request) {

    const body = await request.json();

    if (!body) {
        return Response.json({ "error": "No request body" }, { status: 400 });
    }

    const { playlistURL } = body;

    const playlistObject = await buildPlaylistObject(playlistURL);

    return Response.json(playlistObject);
}