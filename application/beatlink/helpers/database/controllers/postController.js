import { Post } from "../models/Post.js";
import signale from "signale";
import { connect, disconnect } from "../database.js";
import uniqid from "uniqid";

export const createPost = async (postObject) => {
    try {
        await connect();

        const postTitle = postObject.postTitle;
        const playlistId = postObject.playlist_id;

        if (await postExists(postTitle, playlistId)) {
            throw new Error("Post already exists");
        } else {
            const newPost = new Post({
                id: uniqid(),
                postTitle,
                user_id: postObject.user_id,
                playlist_id: playlistId,
                likes: 0,
                comments: [],
            });
            await newPost.save();
            signale.success("Post Created");
        }
    } catch (error) {
        throw error;
    }
}

const postExists = async (postId) => {
    try {
        const post = await Post.findOne({ id: postId });
        return post ? true : false;
    } catch (error) {
        throw error;
    }
}

export const getAllPosts = async () => {
    try {
        await connect();
        const posts = await Post.find({});
        return posts;
    } catch (error) {
        throw error;
    }
}

export const deletePost = async (postId) => {
    try {
        await connect();

        if (!await postExists(postId)) {
            throw new Error("Post does not exist");
        }

        await Post.deleteOne({ id: postId });
        signale.success("Post Deleted");
    } catch (error) {
        throw error;
    }
}

export const addLike = async (postId) => {
    try {
        await connect();

        if (!await postExists(postId)) {
            throw new Error("Post does not exist");
        }

        await Post.updateOne({ id: postId }, { $inc: { likes: 1 } });
        signale.success("Like Added");
    } catch (error) {
        throw error;
    }
}

export const removeLike = async (postId) => {
    try {
        await connect();

        if (!await postExists(postId)) {
            throw new Error("Post does not exist");
        }

        await Post.updateOne({ id: postId }, { $inc: { likes: -1 } });
        signale.success("Like Removed");
    } catch (error) {
        throw error;
    }
}

export const addComment = async (postId, { userId, comment }) => {
    try {
        await connect();

        if (!await postExists(postId)) {
            throw new Error("Post does not exist");
        }

        await Post.updateOne({ id: postId }, { $push: { comments: { userId, comment } } });
        signale.success("Comment Added");
    } catch (error) {
        throw error;
    }
}