import express from "express";
import {
  sendFriendRequest,
  getAllFriends,
  getFriendRequests,
  acceptFriendRequest,
  unFriend,
  rejectFriendRequest
} from "../controllers/index.js";
import { authMiddleware } from "../middleware/index.js";

const friendRoute = express.Router();

friendRoute.get("/requests", authMiddleware, getFriendRequests);
friendRoute.post("/send", authMiddleware, sendFriendRequest);
friendRoute.post("/accept", authMiddleware, acceptFriendRequest);
friendRoute.get("/list", authMiddleware, getAllFriends);
friendRoute.post("/unfriend", authMiddleware, unFriend);
friendRoute.post("/reject", authMiddleware, rejectFriendRequest);

export default friendRoute;
