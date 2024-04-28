// import mongoose from "mongoose";
import { User } from "../../../../helpers/database/models/user";
const mongoose = require('mongoose')

export const dynamic = "force-dynamic";
export async function POST(req) {
    try {
        const body = await req.json();

        const user = await User.findOne({ _id: body.userId });
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 400 });
        }

        let followData;
        if (body.follow == 'following') {
            followData = await User.find({ _id: { $in: user.following } })
                .select('username userImage -_id');
        } else {
            followData = await User.find({ _id: { $in: user.followers } })
                .select('username userImage -_id');
        }

        return Response.json(followData);
    } catch (e) {
        console.log(e)
        return Response.json({ error: e.message }, { status: 500 });
    }
}