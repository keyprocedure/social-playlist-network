// app/api/login/route.js

const bcrypt = require("bcrypt");
import signale from "signale";
import { findUser } from "../../../../helpers/database/controllers/userController";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const body = await parseJSON(request);
        
        if (!body) {
            throw new Error("No body provided");
        }

        const { username, password } = body;

        // Validate input
        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        // Find user in DB
        const user = await findUser(username);
        if (!user) {
            throw new Error("User not found");
        }

        // Verify password
        console.log("password", password);
        console.log("user.password", user.password);
        const passwordMatch = (password == user.password);//await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log("Incorrect password");
            throw new Error("Incorrect password");
        }

        // Respond with success message
        return Response.json({ message: "Login successful" });
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