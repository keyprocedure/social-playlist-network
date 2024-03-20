export default async function parseJSON(request) {
    const contentType = request.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const body = await request.json();
        return body;
    } else {
        return null;
    }
}