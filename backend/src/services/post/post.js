import { Post } from "../../models/index.js";

export const createPost = async (newPost) => {

  const post = await Post.create({
    user: newPost.user,
    text: newPost.text || "",
    image: newPost.image || [],
  });
  return post;
};


export const getPost = async () =>{
    const posts = await Post.find()
      .populate("user", "name profilePhoto")
      .sort({ createdAt: -1 });
    return posts;
}

export const deletePost = async (postId, userId) => {
  const post = await Post.findOneAndDelete({ _id: postId, user: userId });
  return post;
}

export const getPostById = async (postId) => {
  const post = await Post.findById(postId);
  return post;
}