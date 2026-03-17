import { StatusError } from "../../config/statusError.js";
import { Message } from "../../models/index.js";

export const cereateMessage = async (data) => {
  const message = await Message.create(data);
  return message;
};

export const getMessages = async (userId, receiverId) => {
  const messages = await Message.find({
    $or: [
      { sender: userId, receiver: receiverId },
      { sender: receiverId, receiver: userId },
    ],
  }).sort({ createdAt: 1 });

  if (!messages && messages.length == 0) {
    StatusError.notFound("No Message Found");
  }
  return messages;
};
