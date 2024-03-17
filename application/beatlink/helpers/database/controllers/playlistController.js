import Playlist from "../models/Playlist.js";
import signale from "signale";
import { connect, disconnect } from "../database.js";

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

export const getAllPlaylists = async () => {
    try {
        await connect();
        const playlists = await Playlist.find({});
        await disconnect();
        return playlists;
    } catch (error) {
        throw error;
    }
}

await getAllPlaylists();

// export const getPlaylist = async 
