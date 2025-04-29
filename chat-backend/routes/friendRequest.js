const express = require("express");
const { getFriendRequests,sendFriendRequest } = require("../controllers/friendRequestController");
const authMiddleware = require("../middleware/auth"); // Assuming you have an auth middleware
const router = express.Router();

router.get('/requests', authMiddleware, getFriendRequests);
router.post('/request', authMiddleware, sendFriendRequest);


module.exports = router;