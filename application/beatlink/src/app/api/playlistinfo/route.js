import { buildPlaylistObject } from '../../../../helpers/spotifyHelper'
import { createPlaylist } from '../../../../helpers/database/controllers/playlistController'
import parseJSON from '../../../../helpers/parseJSON'

export const dynamic = 'force-dynamic'
export async function POST (request) {
  try {
    const body = await parseJSON(request)

    const { playlistURL } = body

    const playlistObject = await buildPlaylistObject(playlistURL)

    // Add playlist to DB
    await createPlaylist(playlistObject)

    return Response.json(playlistObject)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
