const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Books router is working! This is a placeholder." });
});

module.exports = router; 