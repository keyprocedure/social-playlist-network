import mongoose from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);

