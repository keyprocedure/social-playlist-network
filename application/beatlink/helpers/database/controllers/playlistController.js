import Playlist from "../models/Playlist";
import signale from "signale";
import { connect, disconnect } from "../database";

export const createPlaylist = async (playlistObject) => {
	try {
		await connect();
		const newPlaylist = new Playlist({
			name: playlistObject.name,
			description: playlistObject.description,
			author: playlistObject.author,
			songs: playlistObject.songs,
		});
		await newPlaylist.save();
		signale.success("Playlist Created");

		await disconnect();
	} catch (error) {
		throw error;
	}
};

// export const getPlaylist = async 
