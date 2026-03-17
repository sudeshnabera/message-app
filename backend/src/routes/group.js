import express from "express";
import {
  createGroups,
  fetchUserGroups,
} from "../controllers/index.js";
import { authMiddleware, photoUpload } from "../middleware/index.js";

const groupsRoute = express.Router();

groupsRoute.post(
  "/create",
  photoUpload("group").single("groupPhoto"),
  authMiddleware,
  createGroups,
);
groupsRoute.get("/get", authMiddleware, fetchUserGroups);

export default groupsRoute;
