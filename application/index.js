const express = require("express");
const signale = require("signale");
const path = require("path");
const app = express();
const api = require("./server/api.js");
const port = 3000;

// Setup Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

// Home Page Route
app.get("/about", (req, res) => {
	res.sendFile("public/home.html", { root: __dirname });
});

app.get("/", (req, res) => {
	res.send("Home Page");
});

app.listen(port, () => {
	signale.success(`Server is running on http://localhost:${port}`);
});
