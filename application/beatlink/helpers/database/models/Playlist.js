import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
	id: {
		type: Number,
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
	songs: {
		type: Array,
		required: true,
	},
});

export default mongoose.model("Playlist", playlistSchema);
