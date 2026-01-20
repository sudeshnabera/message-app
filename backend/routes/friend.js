import express from "express";
import { sendFriendRequest, getAllFriends, getFriendRequests, acceptFriendRequest } from "../controllers/index.js";
import { authMiddleware } from "../middleware/index.js";

const friendRoute = express.Router();

friendRoute.get("/get-requests", authMiddleware, getFriendRequests);
friendRoute.post("/send", authMiddleware, sendFriendRequest);
friendRoute.post("/accept", authMiddleware, acceptFriendRequest);
// friendRoute.get("/accept/friends", authMiddleware, getAcceptedFriend);
friendRoute.get("/list", authMiddleware, getAllFriends);

export default friendRoute;
