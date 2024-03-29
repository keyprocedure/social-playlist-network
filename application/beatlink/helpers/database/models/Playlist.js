import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	author: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	songs: {
		type: Array,
		required: true,
	},
});

export const Playlist = mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);