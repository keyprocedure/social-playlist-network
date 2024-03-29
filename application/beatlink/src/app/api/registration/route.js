// app/api/registration/route.js

const bcrypt = require("bcrypt");
import signale from "signale";
import { createUser } from "../../../../helpers/database/controllers/userController";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const body = await parseJSON(request);

        if (!body) {
            throw new Error("No body provided");
        }

        const { username, email, password, birthday } = body;

        // Additional validation for username, email, password can be added here
        if (!email || !password || !username || !birthday) {
            throw new Error("Missing required registration fields");
        }

        // Hash password
        const hashedPassword = password;//await bcrypt.hash(password, 10);

        // Create user object
        const userObject = { username, email, password: hashedPassword, birthday };

        // Add user to DB
        await createUser(userObject);

        // Respond with success message (omit sensitive info)
        return Response.json({ message: "User registered successfully" });
    } catch (e) {
        signale.error(e);
        return Response.json({ error: e.message }, { status: 500 });
    } 
}

async function parseJSON(request) {
    const contentType = request.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return request.json();
    } else {
        return null;
    }
}
