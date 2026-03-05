import React, { useState } from "react";
import { likePost } from "../../../services/post.services";
import ShareModal from "./ShareModal";
import CommentModal from "./CommentModal";

const PostAction = ({ post, comments }) => {
  const user = JSON.parse(localStorage.getItem("user")); // or from context

  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [openShare, setOpenShare] = useState(false);
  const [openCommrnts, setOpenCommrnts] = useState(false);

  const handleLike = async () => {
    const previousLiked = isLiked;
    const previousCount = likesCount;
    setIsLiked((prev) => {
      setLikesCount((count) => (prev ? count - 1 : count + 1));
      return !prev;
    });
    try {
      await likePost(post._id);
    } catch (error) {
      setIsLiked(previousLiked);
      setLikesCount(previousCount);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-around border-t text-sm py-3">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 transition ${
          isLiked ? "text-red-500" : "hover:text-red-500"
        }`}
      >
        {isLiked ? "❤️" : "🤍"}
        <span>{likesCount}</span>
      </button>

      <button
        onClick={() => setOpenCommrnts(true)}
        className="flex items-center gap-2 hover:text-blue-500"
      >
        💬 <span>{comments.length}</span>
      </button>
      {openCommrnts && (
        <CommentModal
          comments={comments}
          onClose={() => setOpenCommrnts(false)}
        />
      )}
      <button
        onClick={() => setOpenShare(true)}
        className="flex items-center gap-2 hover:text-green-500"
      >
        ↗ Share
      </button>
      {openShare && (
        <ShareModal post={post} onClose={() => setOpenShare(false)} />
      )}
    </div>
  );
};

export default PostAction;
