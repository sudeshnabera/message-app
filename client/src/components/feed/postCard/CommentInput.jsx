import React, { useState } from "react";
import { commentPost } from "../../../services/post.services";

const CommentInput = ({ user, postId, setComments }) => {
  const [commentText, setCommentText] = useState("");

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const newComment = {
        text: commentText,
        createdAt: new Date(),
      };
      setComments((prev) => [...prev, newComment]);
      await commentPost(postId, commentText);
      // Optimistic update (increase count instantly)

      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100">
      <img
        src={user.profilePhoto}
        className="w-9 h-9 rounded-full object-cover"
      />

      <input
        type="text"
        name="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
      />

      <button
        onClick={handleComment}
        className="text-blue-500 font-semibold hover:underline"
      >
        Post
      </button>
    </div>
  );
};

export default CommentInput;
