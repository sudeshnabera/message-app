
import express from "express"
import { getProfile, updateProfile } from "../controllers/userController.js"
import authMiddleware from"../middleware/auth.js";

const userRoute = express.Router()

userRoute.get("/profile", authMiddleware, getProfile);
userRoute.put("/update", authMiddleware, updateProfile);

export default userRoute;