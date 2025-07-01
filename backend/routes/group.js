
import express from "express"
import {createGroups, fetchUserGroups} from "../controllers/groupController.js"
import authMiddleware from "../middleware/auth.js";
const groupsRoute = express.Router();


groupsRoute.post("/create", authMiddleware, createGroups);
groupsRoute.get("/get", authMiddleware, fetchUserGroups);

export default groupsRoute