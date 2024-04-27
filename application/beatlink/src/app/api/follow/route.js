import { User } from "../../../../helpers/database/models/user";

export async function POST(req) {
    try {
        const body = await req.json();

        const user = await User.findOne({ _id: body.userId });
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 400 });
        }

        const isAlreadyFollowing = user.following.includes(body.followId);

        if (isAlreadyFollowing) {
            await User.updateOne(
                { _id: body.userId },
                { $pull: { following: body.followId } }
            );
            await User.updateOne(
                { _id: body.followId },
                { $pull: { followers: body.userId } }
            );
        } else {
            await User.updateOne(
                { _id: body.userId },
                { $addToSet: { following: body.followId } }
            );
            await User.updateOne(
                { _id: body.followId },
                { $addToSet: { followers: body.userId } }
            );
        }

        return Response.json({ message: "successfulLy updated" }, { status: 200 });
    } catch (e) {
        console.log(e)
        return Response.json({ error: e.message }, { status: 500 });
    }
}
