import api from "./api.js";

export const getAllMessage = (receiverId) => {
  return api.post("/messages/list", { receiverId });
};
