import { getAllPlaylists } from '../../../../helpers/database/controllers/playlistController.js'

export async function GET () {
  try {
    const playlists = await getAllPlaylists()
    return Response.json(playlists)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
