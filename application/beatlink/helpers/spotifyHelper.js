// const signale = require("signale");
// const axios = require("axios");
// const qs = require("qs");

// const { client_id, client_secret } = require("../config/spotifyConfig.json");
import signale from "signale";
import axios from "axios";
import qs from "qs";

import spotifyConfig from "../config/spotifyConfig.json" assert { type: "json" };
const { client_id, client_secret } = spotifyConfig;
// import { client_id, client_secret } from "../config/spotifyConfig.json" with {type: "json"};
const spotifyAPIURL = "https://accounts.spotify.com/api/token";
let accessToken = "";
async function getAccessToken() {
	try {
		signale.pending("Getting Access Token...");

		const data = qs.stringify({
			grant_type: "client_credentials",
			client_id,
			client_secret,
		});

		const config = {
			method: "post",
			url: spotifyAPIURL,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: data,
		};

		const response = await axios(config);
		const accessToken = response.data.access_token;

		signale.success("Access Token Received!");
		return accessToken;
	} catch (error) {
		signale.error(error);
		throw error;
	}
}

async function getPlaylistID(playlistURL) {
	try {
		const playlistID = playlistURL.split("/playlist/")[1].split("?")[0];
		return playlistID;
	} catch (error) {
		signale.error(error);
		throw error;
	}
}

async function importSpotifyPlaylist(playlistURL) {
	try {
		accessToken = await getAccessToken();
		const playlistID = await getPlaylistID(playlistURL);

		const response = await axios.get(
			"https://api.spotify.com/v1/playlists/" + playlistID,
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			}
		);
		return response.data; // API Response data to pass to handler so we can build the object to be returned to API
	} catch (error) {
		signale.error(error);
		throw error;
	}
}

async function getAuthorGenres(authorID) {
	try {
		const response = await axios.get(
			"https://api.spotify.com/v1/artists/" + authorID,
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			}
		);
		return response.data.genres; // API Response data to pass to handler so we can build the object to be returned to API
	} catch (error) {
		signale.error(error);
		throw error;
	}
}

export async function buildPlaylistObject(playlistURL) {
	try {
		const spotifyPlaylistResponse = await importSpotifyPlaylist(playlistURL);
		const playlistObject = {};

		const playlistName = spotifyPlaylistResponse.name;
		const playlistDescription = spotifyPlaylistResponse.description;
		const playlistAuthor = spotifyPlaylistResponse.owner.display_name;

		playlistObject["name"] = playlistName;
		playlistObject["description"] = playlistDescription;
		playlistObject["author"] = playlistAuthor;

		const playlistItems = spotifyPlaylistResponse.tracks.items;

		const songs = [];

		for (const playlistItem of playlistItems) {
			const song = {};
			const trackName = playlistItem.track.name;
			const artistName = playlistItem.track.artists[0].name;
			const albumName = playlistItem.track.album.name;
			const duration = playlistItem.track.duration_ms;
			// const genres = await getAuthorGenres(playlistItem.track.artists[0].id);
			song["title"] = trackName;
			song["artist"] = artistName;
			song["album"] = albumName;
			song["duration"] = duration;
			// song["genre"] = genres;

			songs.push(song);
		}

		playlistObject["songs"] = songs;

		return playlistObject;
	} catch (error) {
		signale.error(error);
		throw error;
	}
}
