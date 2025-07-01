import express from "express"
import multer from 'multer';
import { createPost, getPost, deletePost, likePost, commentPost } from "../controllers/userPostController.js"
import authMiddleware from "../middleware/auth.js";

const postRoute = express.Router();

// image storage Engine
const storage = multer.diskStorage({
    destination: "uploads/posts",
    filename: (req, file, cb) => {
       return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

postRoute.post("/create",authMiddleware, upload.array("images"), createPost)
postRoute.get("/get",authMiddleware, getPost)
postRoute.post("/delete",authMiddleware, deletePost)
postRoute.post("/like",authMiddleware, likePost)
postRoute.post("/comment",authMiddleware, commentPost)

export default postRoute