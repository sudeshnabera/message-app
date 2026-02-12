import { Friends, User } from "../../models/index.js";
import { StatusError } from "../../config/statusError.js";

export const getUserById = async (userId) => {
  let user = await User.findOne({ _id: userId });
  if (!user) {
    throw StatusError.notFound("user Not Found");
  }
  return user;
};

export const getUserByEmail = async (email) => {
  let user = await User.findOne({ email:email });
  return user;
};

export const createUser = async (userData) => {
  const user = await User.create(userData);
};

export const getUserByUsernameAndEmail = async ({ emailOrUsername }) => {
  let user = await User.findOne({
    $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
  });
  if (!user) {
    throw StatusError.notFound("User not found");
  }
  return user;
};

export const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData);

  // if (!user) {
  //   throw StatusError.notFound("User not found");
  // }
};

export const getUsers = async (userId, excludedUserIds) => {
  const users = await User.find({
    _id: {
      $nin: Array.from(excludedUserIds),
    },
  });
  return users;
};
