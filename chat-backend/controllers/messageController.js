const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Message = require('../models/message'); // Assuming you have a Message model

exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    // Validate input
    if (!recipientId || !content) {
      return res.status(400).json({ message: "Recipient ID and content are required." });
    }

    // Save the message to the database
    const message = await Message.create({
      senderId: req.user.id, // Sender is the logged-in user
      recipientId,
      content,
    });

    res.status(201).json({ message: "Message sent successfully.", data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while sending the message." });
  }
};