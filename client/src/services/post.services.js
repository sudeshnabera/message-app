import api from "./api.js";

export const getPost = () => {
  return api.get("/post/get");
};

export const createPost = (postData) => {
  debugger;
  return api.post("/post/create", postData);
};

export const likePost = (postId) => {
  return api.post("/post/like", { postId });
};

export const commentPost = (postId, comment) => {
  return api.post("/post/comment", { postId, comment });
};

export const sharePost = (postId, caption) => {
  console.log(postId);
  console.log(caption);

  return api.post("/post/share", postId, caption);
};
