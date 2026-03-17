import api from "./api.js";

export const createGroup = (formData) => {
  return api.post("/groups/create", formData);
};
