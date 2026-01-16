
import express from "express"
import { getAllUsers } from "../controllers/userListController.js"
import {authMiddleware} from "../middleware/auth.js";
const userlistRoute = express.Router();

userlistRoute.get("/list", authMiddleware, getAllUsers);

export default userlistRoute;
