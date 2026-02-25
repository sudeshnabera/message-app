import React, { createContext, useEffect, useState } from "react";
import { getPost } from "../services/post.services.js";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);
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
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ post, fetchPosts }}>{children}</PostContext.Provider>
  );
};
