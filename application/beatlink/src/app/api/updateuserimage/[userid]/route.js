// app/api/updateuserimage/[userid].js
import { updateUserImage } from '../../../../../helpers/database/controllers/UserController';
import { findUserById } from '../../../../../helpers/database/controllers/UserController';

export const dynamic = "force-dynamic";
export async function POST(request, { params }) {
    try {
        const userid = params.userid;
        const body = await request.json(); 
        const updates = {
            userImage: body.userImage
        };
       
        const user = await findUserById(userid);
        
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        
        const updatedUser = await updateUserImage(userid, updates);

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}