import makeSongRecommendation from "../../../../../helpers/aiSongRecommendation";
import parseJSON from "../../../../../helpers/parseJSON";
import { getSongs, getAuthorList } from "../../../../../helpers/spotifyHelper";
import { getPlaylist } from "../../../../../helpers/database/controllers/playlistController";

export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
    try {
        const playlistId = params.playlistid;

        // Get playlist from database
        const playlist = await getPlaylist(playlistId);

        if (!playlist) {
            throw new Error("Playlist not found");
        }

        // Get songs and authors from Spotify
        const songs = await getSongs(playlist);
        const authors = await getAuthorList(playlist);

        // Returns song recommendations in string form which needs to be parsed
        const rawSongRecommendationsString = await makeSongRecommendation(authors, songs);

        const songRecommendations = rawSongRecommendationsString.split("\n").map((song) => {
            const [songName, artist] = song.split(" by");

            const cleanedSongName = songName.replace(/\\/g, "").replace(/\"/g, "").replace(/\d+\./g, "").trim();
            return {
                artist,
                songName: cleanedSongName,
            };
        });

        return Response.json({
            recommendations: songRecommendations
        });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}