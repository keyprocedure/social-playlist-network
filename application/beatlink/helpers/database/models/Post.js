import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    postTitle: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true, // make true when user auth is implemented
    },
    playlist_id: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    comments: {
        type: Array,
        required: false,
    }
});

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);