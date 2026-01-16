import express from "express";
import { loginUser, registerUser } from "../controllers/index.js";
import { photoUpload, validate } from "../middleware/index.js";
import { registerValidation } from "../validation/index.js";
const authRouter = express.Router();

authRouter.post("/register", photoUpload("profile").single("profilePhoto"), validate(registerValidation), registerUser);

authRouter.post("/login", loginUser);

export default authRouter;
