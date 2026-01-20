import { registerUser, loginUser } from "./authController.js";

import { getProfile, updateProfile } from "./userController.js";

import { getAllFriends } from "./friendController.js";
import { getDiscoverUsers } from "./userListController.js";
import {sendFriendRequest, getFriendRequests, acceptFriendRequest} from "./friendRequestController.js"
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllFriends,
  getDiscoverUsers,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest
};
