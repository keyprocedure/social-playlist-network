import { createPost } from '../../../../helpers/database/controllers/postController'

import parseJSON from '../../../../helpers/parseJSON'
import {
  getPlaylist,
  createPlaylist,
} from '../../../../helpers/database/controllers/playlistController'
import {
  buildPlaylistObject,
  buildPlaylistURL,
} from '../../../../helpers/spotifyHelper'

export const dynamic = 'force-dynamic'
export async function POST(request) {
  try {
    const body = await parseJSON(request)

    const { postTitle, userId, playlistId } = body

    const playlist = await getPlaylist(playlistId)

    // Create new playlist if doesn't exist in DB already
    if (!playlist) {
      const playlistURL = await buildPlaylistURL(playlistId)
      const playlistObject = await buildPlaylistObject(playlistURL)
      await createPlaylist(playlistObject)
    }
    // Add post to DB
    const newPost = await createPost({
      postTitle,
      user_id: userId,
      playlist_id: playlistId,
    })

    return Response.json({
      message: 'Post Created',
      postId: newPost.postId,
      postTitle: newPost.postTitle,
      playlistId: newPost.playlistId,
    })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
