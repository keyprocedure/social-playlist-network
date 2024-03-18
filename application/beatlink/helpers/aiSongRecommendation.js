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
    const response = await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: prompt,
    });

    const run = openai.beta.threads.runs.createAndStream(thread.id, {
        assistant_id: assistant.id
    })
        .on('textCreated', (text) => process.stdout.write('\nassistant > '))
        .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value))
        .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
        .on('toolCallDelta', (toolCallDelta, snapshot) => {
            if (toolCallDelta.type === 'code_interpreter') {
                if (toolCallDelta.code_interpreter.input) {
                    process.stdout.write(toolCallDelta.code_interpreter.input);
                }
                if (toolCallDelta.code_interpreter.outputs) {
                    process.stdout.write("\noutput >\n");
                    toolCallDelta.code_interpreter.outputs.forEach(output => {
                        if (output.type === "logs") {
                            process.stdout.write(`\n${output.logs}\n`);
                        }
                    });
                }
            }
        });
    // signale.info("Response: ", response.content[0].text);
    // return response.content[0].text;
};

await makeSongRecommendation("Kanye West, Weeknd");