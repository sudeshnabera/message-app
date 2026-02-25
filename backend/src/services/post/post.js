import { Post } from "../../models/index.js";
import { appendBaseUrl } from "../../helper/index.js";

export const createPost = async (newPost) => {
  const post = await Post.create({
    user: newPost.user,
    caption: newPost.caption || "",
    image: newPost.image || [],
  });
  return post;
};

export const getPost = async () => {
  const posts = await Post.find()
    .populate("user", "name profilePhoto")
    .populate({
      path: "sharedPost",
      populate: {
        path: "user",
        select: "name profilePhoto",
      },
    })
    .sort({ createdAt: -1 });
  return appendBaseUrl(posts, "image", "post");
};

export const deletePost = async (postId, userId) => {
  const post = await Post.findOneAndDelete({ _id: postId, user: userId });
  return post;
};

export const getPostById = async (postId) => {
  const post = await Post.findById(postId);
  return post;
};

export const sharePost = async (data) => {
  let rePost = await Post.create(data);
  return rePost;
};
