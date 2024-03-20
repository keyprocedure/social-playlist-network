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

async function getPlaylistInformation(playlistURL) {
	try {
		accessToken = await getAccessToken();

		signale.info("Getting Playlist Information...");
		const playlistID = await getPlaylistID(playlistURL);

		const response = await axios.get(
			"https://api.spotify.com/v1/playlists/" + playlistID,
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			}
		);
		return {
			id: response.data.id,
			name: response.data.name,
			description: response.data.description,
			author: response.data.owner.display_name,
		}; // API Response data to pass to handler so we can build the object to be returned to API
	} catch (error) {
		signale.error(error);
		throw error;
	}

}

async function getPlaylistItems(playlistURL) {
	try {
		accessToken = await getAccessToken();
		signale.info("Getting Playlist Items...");

		const playlistID = await getPlaylistID(playlistURL);

		const playlistItems = [];

		// let offset = 0;
		let query = `https://api.spotify.com/v1/playlists/` + playlistID + `/tracks?offset=0&limit=100`;
		let response;
		do {
			response = await axios.get(query, {
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			});
			playlistItems.push(response.data.items);
			query = response.data.next;
		} while (response.data.next);

		return playlistItems;
		// signale.info(response.data.tracks);
		// while (response.data.tracks.next) {
		// 	response = await axios.get(
		// 		query,
		// 		{
		// 			headers: {
		// 				Authorization: "Bearer " + accessToken,
		// 			},
		// 		}
		// 	);

		// 	if (response.data.tracks.next) {
		// 		query = response.data.tracks.next;
		// 	}
		// 	playlistItems.push(response.data.tracks);
		// }

		// return playlistItems;
		// while (response.tracks.next) {
		// 	response = await axios.get(
		// 		query,
		// 		{
		// 			headers: {
		// 				Authorization: "Bearer " + accessToken,
		// 			},
		// 		}
		// 	);

		// 	query = response.tracks.next;
		// 	playlistItems.push(response.data.tracks);
		// }


		// return playlistItems; // API Response data to pass to handler so we can build the object to be returned to API
	} catch (error) {
		signale.error(error);
		throw error;
	}
}

await buildPlaylistObject("https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=e810e5b153204bfc");

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
		const playlistInformation = await getPlaylistInformation(playlistURL);
		const playlistItems = await getPlaylistItems(playlistURL);
		const playlistObject = {};

		playlistObject["name"] = playlistInformation.name;
		playlistObject["description"] = playlistInformation.description;
		playlistObject["author"] = playlistInformation.author;

		const songs = [];

		for (const playlistItem of playlistItems) {

			for (const item of playlistItem) {
				const song = {};
				const trackName = item.track.name;
				const artistName = item.track.artists[0].name;
				const albumName = item.track.album.name;
				const duration = item.track.duration_ms;
				// const genres = await getAuthorGenres(playlistItem.track.artists[0].id);
				song["title"] = trackName;
				song["artist"] = artistName;
				song["album"] = albumName;
				song["duration"] = duration;
				// song["genre"] = genres;

				songs.push(song);
			}
			// const song = {};
			// const trackName = playlistItem.name;
			// const artistName = playlistItem.artists[0].name;
			// const albumName = playlistItem.album.name;
			// const duration = playlistItem.duration_ms;
			// // const genres = await getAuthorGenres(playlistItem.track.artists[0].id);
			// song["title"] = trackName;
			// song["artist"] = artistName;
			// song["album"] = albumName;
			// song["duration"] = duration;
			// // song["genre"] = genres;

			// songs.push(song);
		}

		playlistObject["songs"] = songs;

		return playlistObject;
	} catch (error) {
		throw error;
	}
	// try {
	// 	const spotifyPlaylistResponse = await importSpotifyPlaylist(playlistURL);
	// 	const playlistObject = {};

	// 	const playlistName = spotifyPlaylistResponse.name;
	// 	const playlistDescription = spotifyPlaylistResponse.description;
	// 	const playlistAuthor = spotifyPlaylistResponse.owner.display_name;

	// 	playlistObject["name"] = playlistName;
	// 	playlistObject["description"] = playlistDescription;
	// 	playlistObject["author"] = playlistAuthor;

	// 	const playlistItems = spotifyPlaylistResponse.tracks.items;

	// 	const songs = [];

	// 	for (const playlistItem of playlistItems) {
	// 		const song = {};
	// 		const trackName = playlistItem.track.name;
	// 		const artistName = playlistItem.track.artists[0].name;
	// 		const albumName = playlistItem.track.album.name;
	// 		const duration = playlistItem.track.duration_ms;
	// 		// const genres = await getAuthorGenres(playlistItem.track.artists[0].id);
	// 		song["title"] = trackName;
	// 		song["artist"] = artistName;
	// 		song["album"] = albumName;
	// 		song["duration"] = duration;
	// 		// song["genre"] = genres;

	// 		songs.push(song);
	// 	}

	// 	playlistObject["songs"] = songs;

	// 	return playlistObject;
	// } catch (error) {
	// 	signale.error(error);
	// 	throw error;
	// }
}
