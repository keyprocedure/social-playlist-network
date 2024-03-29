import makeSongRecommendation from "../../../../helpers/aiSongRecommendation";
import parseJSON from "../../../../helpers/parseJSON";
export const dynamic = "force-dynamic";
export async function POST(request) {
    try {
        const body = await parseJSON(request);

        const { artistList, currentSongs } = body;

        // Returns song recommendations in string form which needs to be parsed
        const rawSongRecommendationsString = await makeSongRecommendation(artistList, currentSongs);

        const songRecommendations = rawSongRecommendationsString.split("\n").map((song) => {
            const [songName, artist] = song.split(" by ");

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

