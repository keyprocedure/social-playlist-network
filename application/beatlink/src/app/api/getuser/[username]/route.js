// app/api/user/[username].js
import { findUser } from "../../../../../helpers/database/controllers/userController";

export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
    try {
        const username = params.username;
        const user = await findUser(username);

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 400 });
        }

        return Response.json(user);
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}