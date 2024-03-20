import OpenAI from "openai";
import aiConfig from "../config/aiConfig.json" assert { type: "json" };
import signale from "signale";

const { api_key } = aiConfig;
const openai = new OpenAI({
    apiKey: api_key,
});

export default async function makeSongRecommendation(artistList, currentSongs) {

    const prompt = `Given the following list of artists: ${artistList}, provide 3 song recommendations that are similar in style or genre to the listed artists. Also, it can't contain any of the songs that are contained in this list ${currentSongs} The recommendations should be formatted as follows:

    1. Song Title by Artist Name
    2. Song Title by Artist Name
    3. Song Title by Artist Name`;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        temperature: 0.2,
        n: 1,
        max_tokens: 150,
        messages: [
            {
                role: "system",
                content: prompt,
            },
        ],
    })

    return response.choices[0].message.content;
}


// const artistList = ["Kanye West", "Drake", "Kendrick Lamar", "J. Cole", "Jay-Z", "Lil Wayne", "Eminem", "Nas", "50 Cent", "Tupac", "Biggie", "Snoop Dogg", "Ice Cube", "Dr. Dre", "N.W.A.", "Wu-Tang Clan", "OutKast", "A Tribe Called Quest", "Public Enemy"];
// const currentSongs = ["Stronger", "Gold Digger", "Heartless", "Runaway", "Power", "All of the Lights"];
// const songRecommendations = await makeSongRecommendation(artistList, currentSongs);

// console.log(songRecommendations);