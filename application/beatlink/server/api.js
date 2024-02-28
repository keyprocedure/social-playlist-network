const express = require("express");
const router = express.Router();

router.post("/playlistinfo", (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "No data was sent" });
    }

    signale.info(req.body);

    res.send("Playlist Info");
});

module.exports = router;