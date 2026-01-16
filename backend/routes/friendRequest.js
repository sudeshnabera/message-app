import express from "express";
import {
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  getAcceptedFriend,
} from "../controllers/friendRequestController.js";
import { authMiddleware } from "../middleware/auth.js";
const friendRequestRoute = express.Router();

friendRequestRoute.get("/get", authMiddleware, getFriendRequests);
friendRequestRoute.post("/send", authMiddleware, sendFriendRequest);
friendRequestRoute.post("/accept", authMiddleware, acceptFriendRequest);
friendRequestRoute.get("/accept/friends", authMiddleware, getAcceptedFriend);

export default friendRequestRoute;
