const express = require("express");
const { getFriendRequests,sendFriendRequest, acceptFriendRequest } = require("../controllers/friendRequestController");
const authMiddleware = require("../middleware/auth"); // Assuming you have an auth middleware
const router = express.Router();

router.get('/requests', authMiddleware, getFriendRequests);
router.post('/request', authMiddleware, sendFriendRequest);
router.post('/accept/:requestId', authMiddleware, acceptFriendRequest);


module.exports = router;