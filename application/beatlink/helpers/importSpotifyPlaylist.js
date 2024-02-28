const signale = require("signale");
const axios = require("axios");
const qs = require("qs");

const { client_id, client_secret } = require("../config/spotifyConfig.json");
const spotifyAPIURL = "https://accounts.spotify.com/api/token";

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

		signale.success("API is working");
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
		const accessToken = await getAccessToken();
		const playlistID = await getPlaylistID(playlistURL);

		const response = await axios.get(
			"https://api.spotify.com/v1/playlists/" + playlistID,
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			}
		);

		const playlistName = response.data.name;
		const playlistItems = response.data.tracks.items;

		for (const playlistItem of playlistItems) {
			const trackName = playlistItem.track.name;
			const artistName = playlistItem.track.artists[0].name;
			signale.info(trackName, " - ", artistName);
		}
	} catch (error) {
		signale.error(error);
		throw error;
	}
}