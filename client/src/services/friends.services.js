import api from "./api.js";

export const getAllFriends = () => {
  return api.get("/friend/list");
};

export const unFriend = (senderId, receiverId) => {
  return api.post("/friend/unfriend", { senderId, receiverId });
};

export const getFriendSuggestion = () => {
  return api.get("/user/list");
};

export const createFriendRequest = (receiverId) => {
  return api.post("/friend/send", { receiverId });
};

export const acceptFriendRequest = (receiverId) => {
  return api.post("/friend/accept", { receiverId });
};

export const getFriendRequest = () =>{
    return api.get("/friend/requests");
}