const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/messageController");
const authMiddleware = require("../middleware/auth"); // Assuming you have an auth middleware

// Route to send a message
router.post("/send", authMiddleware, sendMessage);

module.exports = router;