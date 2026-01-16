import express from "express";
import { getMessages } from "../controllers/messageController.js";
import {authMiddleware} from "../middleware/auth.js";
const messageRoute = express.Router();

messageRoute.post("/get", authMiddleware, getMessages);

export default messageRoute;
