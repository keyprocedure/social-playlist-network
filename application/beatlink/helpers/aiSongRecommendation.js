import OpenAI from "openai";
import aiConfig from "../config/aiConfig.json" assert { type: "json" };
import signale from "signale";

const { api_key } = aiConfig;
signale.info("AI Key: ", api_key);
const openai = new OpenAI({
	apiKey: api_key,
});

const createThread = async (prompt) => {
	const thread = await openai.beta.threads.create();
	signale.info("Thread Created: ", thread.id);

	return thread;
};


const makeSongRecommendation = async (prompt) => {
    const thread = await createThread(prompt);
    const response = await openai.beta.threads.createMessage(thread.id, {
        content: prompt,
    });
    signale.info("Response: ", response);
    return response;
};