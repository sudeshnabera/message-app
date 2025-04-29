const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userListController");
const authMiddleware = require("../middleware/auth");

router.get("/list", authMiddleware, getAllUsers);

module.exports = router;
