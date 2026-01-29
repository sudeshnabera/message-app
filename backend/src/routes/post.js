import express from "express";
import {
  createPost,
  getPost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/index.js";
import { authMiddleware, photoUpload } from "../middleware/index.js";

const postRoute = express.Router();

postRoute.post(
  "/create",
  photoUpload("post").array("postPhoto", 5),
  authMiddleware,
  createPost,
);
postRoute.get("/get", authMiddleware, getPost);
postRoute.post("/delete", authMiddleware, deletePost);
postRoute.post("/like", authMiddleware, likePost);
postRoute.post("/comment", authMiddleware, commentPost);

export default postRoute;
