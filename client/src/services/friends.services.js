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

export const acceptFriendRequest = (requestId) => {
  return api.post("/friend/accept", { requestId });
};

export const getFriendRequest = () =>{
    return api.get("/friend/requests");
}

export const rejectFriendRequest = (requestId) =>{
  return api.post("/friend/reject", {requestId})
}