import api from "./api.js";

export const registerUser = (formData) => {
  return api.post("/auth/register", formData);
};

export const loginUser = (credentials) => {
  debugger
  return api.post("/auth/login", credentials);
};
