const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.post('/update', jsonParser, async (req, res) => {
    try {
        const keyFilePath = path.join(__dirname, 'key.json');
        const file = await fs.readFile(keyFilePath, 'utf-8');
        const data = JSON.parse(file);

        if (req.body.key !== data.key) {
            return res.status(400).json({ error: "Invalid Secret Key" });
        }

        const updatedData = {
            key: data.key,
            password: req.body.password
        };

        await fs.writeFile(keyFilePath, JSON.stringify(updatedData));
        return res.status(201).json({ message: "Password updated successfully" });
    } catch (err) {
        if (err.code === 'ENOENT') {
            return res.status(404).json({ error: "Key file not found" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
