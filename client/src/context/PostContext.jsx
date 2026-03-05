import React, { createContext, useEffect, useState } from "react";
import { getPost, getPostByUser } from "../services/post.services.js";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await getPost();

      if (response.data.success) {
        setPost(response.data.userPost);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostByUserId = async (userId) => {
    try {
      const response = await getPostByUser(userId);
      setUserPost(response.data.userPost)
    } catch (error) {
       console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ post, fetchPosts, getPostByUserId, userPost }}>
      {children}
    </PostContext.Provider>
  );
};
