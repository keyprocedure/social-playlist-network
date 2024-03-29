export default async function parseJSON(request) {
    const contentType = request.headers.get("content-type");

    if (!contentType) {
        throw new Error("No Content-Type Provided");
    }

    if (contentType !== "application/json") {
        throw new Error("Content-Type must be application/json");
    }

    const body = await request.json();

    if (!body) {
        throw new Error("No Body Provided");
    }
    
    return body;
}