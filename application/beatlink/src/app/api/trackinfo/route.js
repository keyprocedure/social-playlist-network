import { getTrackURL } from "../../../../helpers/spotifyHelper";

export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const artistName = searchParams.get("artist");
    const trackName = searchParams.get("track");

    const trackURL = await getTrackURL(trackName, artistName);
    return Response.json({ trackURL });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
