import express from "express";
import { getProfile, updateProfile, getDiscoverUsers } from "../controllers/index.js";
import { authMiddleware, photoUpload, validate } from "../middleware/index.js";
import { updateProfileValidation } from "../validation/index.js";

const userRoute = express.Router();

userRoute.get("/profile", authMiddleware, getProfile);
userRoute.post(
  "/update",
  photoUpload("profile").single("profilePhoto"),
  authMiddleware,
  validate(updateProfileValidation),
  updateProfile,
);
userRoute.get("/list", authMiddleware, getDiscoverUsers);

export default userRoute;
