const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Fetch profile details of the logged-in user
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` is populated by middleware
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "phone"], // Select only necessary fields
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};