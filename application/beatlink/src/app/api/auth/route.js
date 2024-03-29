// app/api/auth/route.js
import { findUser } from "../../../../helpers/database/controllers/userController";

export async function POST(request) {
    try {
        const { username, password } = await request.json();
        const user = await findUser(username, password);
        
        if (user) {
           // console.log(response);
            return new Response(JSON.stringify({ success: true, token: "simulated_token" }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200, // HTTP 200 OK
            });
        } else {
            // console.log(response);
            return new Response(JSON.stringify({ success: false, error: "Invalid login credentials" }), {
                headers: { 'Content-Type': 'application/json' },
                status: 401, // HTTP 401 Unauthorized
            });
        }
    } catch (e) {
        // console.log(response);
        return new Response(JSON.stringify({ success: false, error: e.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500, // HTTP 500 Internal Server Error
        });
    }
}