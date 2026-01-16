import { User } from "../../models/index.js";
import { StatusError } from "../../config/statusError.js";

export const getUserById = async (userId) => {
  let user = await User.findOne({ userId });
  if (!user) {
    throw StatusError.notFound("user Not Found");
  }
  return user;
};

export const getUserByEmail = async (email) => {
  let user = await User.findOne({ email });
  return user;
};

export const createUser = async (userData) => {
  const user = await User.create(userData);
};

export const getUserByUsernameAndEmail = async ({ username, email }) => {
  let user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!user) {
    throw StatusError.notFound("User not found");
  }
  return user;
};

export const updateUser = async (userId, updateData) => {
  console.log("updateData",updateData);
  console.log("userId",userId);
  const user = await User.findByIdAndUpdate(userId, updateData);
  console.log("sdvxb",user);
  
  // if (!user) {
  //   throw StatusError.notFound("User not found");
  // }
};
