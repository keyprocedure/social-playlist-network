// helpers/database/models/user.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
        bio: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
        userImage: {
            type: String,
            required: false,
        },
        following:{
            type: Array,
            required: false,
        },
        followers:{
            type: Array,
            required: false,
        },
        playlists:{
            type: Array,
            required: false,
        },

    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
