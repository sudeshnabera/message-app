import api from "./api.js";

export const registerUser = (formData) => {
  debugger;
  return api.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials);
};
