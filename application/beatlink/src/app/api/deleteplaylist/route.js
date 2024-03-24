import { deletePlaylist } from "../../../../helpers/database/controllers/playlistController";
import parseJSON from "../../../../helpers/parseJSON";

export const dynamic = "force-dynamic";
export async function DELETE(request) {
    try {
        const body = await parseJSON(request);
        
        const { playlistId } = body;

        await deletePlaylist(playlistId);

        return Response.json({ success: true });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}