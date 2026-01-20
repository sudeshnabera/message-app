import { Friends, User } from "../../models/index.js";
import { StatusError } from "../../config/statusError.js";

export const getAllFriends = async (userId) => {
  const friends = await Friends.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
    status: "accepted",
  })
    .populate("senderId", "username email")
    .populate("receiverId", "username email");
  if (!friends || friends.length === 0) {
    throw StatusError.notFound("No friends found");
  }
  return friends;
};

export const getUserFriendConnections = async (userId) => {
  const friendConnections = await Friends.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  });

  // if (!friendConnections  || friendConnections .length === 0) {
  //   throw StatusError.notFound("No friend connections found");
  // }
  return friendConnections;
};

export const getFriendStatus = async (senderId, receiverId) => {
  let friendStatus = await Friends.findOne({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  });
  if (friendStatus) {
    throw StatusError.conflict("Friend request already exists.");
  }
  return friendStatus;
};

export const createFriendRequest = async (senderId, receiverId) => {
  const request = new Friends({
    senderId,
    receiverId,
    status: "pending",
  });

  await request.save();
};

export const getAllFriendRequests = async (userId) => {
  const requests = await Friends.find({
    receiverId: userId,
    status: "pending",
  })
    .populate("senderId", "name email bio bod phone gender profilePhoto")
    .sort({ createdAt: -1 });
  if (!requests || requests.length === 0) {
    throw StatusError.notFound("No friend requests found");
  }
  return requests;
};

export const getFriendRequestById = async (requestId, userId) => {
  const friendRequest = await Friends.findOne({
    _id: requestId,
    receiverId: userId,
  });
  if (!friendRequest) {
    throw StatusError.notFound("Friend request not found");
  }
  return friendRequest;
};
