const jwt = require("jsonwebtoken");
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
        throw new Error('User not found');
      }
    req.user = user; // contains { id: user.id, ... }
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};