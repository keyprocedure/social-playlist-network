import { getPlaylistFromPost } from "../../../../../../helpers/database/controllers/postController";
import { getPlaylist } from "../../../../../../helpers/database/controllers/playlistController";

export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
  try {
    const postId = params.postId;
    const playlistId = await getPlaylistFromPost(postId);
    const playlist = await getPlaylist(playlistId);

    if (!playlist) {
      return Response.json({ error: "Playlist not found" }, { status: 400 });
    }

    return Response.json(playlist);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
