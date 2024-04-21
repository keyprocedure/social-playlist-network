import { findUserById } from "../../../../helpers/database/controllers/UserController";
import { Playlist } from "../../../../helpers/database/models/Playlist";
import { Post } from "../../../../helpers/database/models/Post";

export async function POST(req) {
  try {
    const userId = await req.json();
    const user = await findUserById(userId.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 400 });
    }

    const posts = await Post.find({ user_id: user._id });

    const playlistPromises = posts.map(async (post) => {
      const data = await Playlist.findOne({ id: post.playlist_id }).select(
        "-_id image"
      );

      if (data) {
        return {
          postId: post.id,
          image: data.image,
        };
      }
      return null; // Return null if data not found
    });

    // Wait for all promises to resolve using Promise.all
    const playlist = await Promise.all(playlistPromises);

    const data = {
      user: user,
      posts: playlist,
    };

    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
