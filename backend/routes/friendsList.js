const express = require("express");
const router = express.Router();
const { getAllFriends } = require("../controllers/friendController");
const {authMiddleware} = require("../middleware/auth");

router.get("/list", authMiddleware, getAllFriends);

module.exports = router;
