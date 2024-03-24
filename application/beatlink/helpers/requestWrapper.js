import signale from "signale";
import parseJSON from "./parseJSON";

export async function requestWrapper(request, controller) {
    try {
        if (!request) {
            throw new Error("No Request Provided");
        }

        if (!controller) {
            throw new Error("No Controller Provided");
        }

        if (request.method === "POST") {
            const body = await parseJSON(request);

            if (!body) {
                throw new Error("No Body Provided");
            }


            await controller(body);
        } else if (request.method === "GET") {
            signale.info("GET Request");
        }

    } catch (error) {
        throw error;
    }
}