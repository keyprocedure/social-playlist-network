import { Playlist } from "../models/Playlist.js";
import signale from "signale";
import { connect, disconnect } from "../database.js";
import uniqid from "uniqid";

export const createPlaylist = async (playlistObject) => {
    try {
        await connect();

        const playlistName = playlistObject.name;
        const playlistAuthor = playlistObject.author;

        if (await hasPlaylist(playlistName, playlistAuthor)) {
            throw new Error("Playlist already exists");
        } else {
            const newPlaylist = new Playlist({
                id: uniqid(),
                name: playlistName,
                description: playlistObject.description,
                author: playlistAuthor,
                songs: playlistObject.songs,
            });
            await newPlaylist.save();
            signale.success("Playlist Created");

        }


    } catch (error) {
        throw error;
    }
};

export const hasPlaylist = async (name, author) => {
    try {
        const playlist = await Playlist.findOne({ name, author });

        return playlist ? true : false;
    } catch (error) {
        throw error;
    }

}

export const getAllPlaylists = async () => {
    try {
        await connect();
        const playlists = await Playlist.find({});
        return playlists;
    } catch (error) {
        throw error;
    }
}

export const deletePlaylist = async (playlistId) => {
    try {
        await connect();

        if (!await Playlist.findOne({ id: playlistId })) {
            throw new Error("Playlist does not exist");
        }

        await Playlist.deleteOne({ id: playlistId }).exec();
        signale.success("Playlist Deleted");

    } catch (error) {
        throw error;
    }
}

export const getPlaylist = async (playlistId) => {
    try {
        await connect();
        const playlist = await Playlist.findOne({ id: playlistId });
        return playlist;
    } catch (error) {
        throw error;
    }
}