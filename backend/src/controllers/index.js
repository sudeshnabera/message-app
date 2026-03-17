import { registerUser, loginUser } from "./authController.js";
import { getProfile, updateProfile } from "./userController.js";
import { getAllFriends } from "./friendController.js";
import { getDiscoverUsers } from "./userListController.js";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  unFriend,
  rejectFriendRequest,
} from "./friendRequestController.js";
import {
  createPost,
  getPost,
  deletePost,
  likePost,
  commentPost,
  sharePost,
  getPostByUserId,
} from "./postController.js";
import { createGroups, fetchUserGroups } from "./groupController.js";
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllFriends,
  getDiscoverUsers,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  createPost,
  getPost,
  deletePost,
  likePost,
  commentPost,
  sharePost,
  getPostByUserId,
  unFriend,
  rejectFriendRequest,
  createGroups,
  fetchUserGroups
};
