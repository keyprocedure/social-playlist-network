const express = require("express");
const signale = require("signale");
const path = require("path");
const app = express();
const port = 3000;

// Setup Middleware
app.use(express.static(path.join(__dirname, "public")));

// Home Page Route

app.get("/", (req, res) => {
	res.sendFile("public/home.html", { root: __dirname });
});

app.listen(port, () => {
	signale.success(`Server is running on http://localhost:${port}`);
});
