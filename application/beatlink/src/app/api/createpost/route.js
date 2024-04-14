import { createPost } from "../../../../helpers/database/controllers/postController";
import { requestWrapper } from "../../../../helpers/requestWrapper";
import parseJSON from "../../../../helpers/parseJSON";
import {
  getPlaylist,
  createPlaylist,
} from "../../../../helpers/database/controllers/playlistController";
import {
  buildPlaylistObject,
  buildPlaylistURL,
} from "../../../../helpers/spotifyHelper";

export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const body = await parseJSON(request);

    const { postTitle, user_id, playlist_id } = body;

    const playlist = await getPlaylist(playlist_id);

    // Create new playlist if doesn't exist in DB already
    if (!playlist) {
      const playlistURL = await buildPlaylistURL(playlist_id);
      const playlistObject = await buildPlaylistObject(playlistURL);
      await createPlaylist(playlistObject);
    }
    // Add post to DB
    const newPost = await createPost({ postTitle, user_id, playlist_id });

    return Response.json({
      message: "Post Created",
      postId: newPost.postId,
      postTitle: newPost.postTitle,
      playlistId: newPost.playlistId,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

