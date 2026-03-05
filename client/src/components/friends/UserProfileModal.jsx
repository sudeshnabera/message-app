import React, { useContext, useEffect } from "react";
import { PostContext } from "../../context/PostContext.jsx";
import PostCard from "../feed/postCard/PostCard.jsx";
import { FriendContext } from "../../context/FriendContext.jsx";

const UserProfileModal = ({
  onClose,
  user,
  variant,
  onMessage,
  loggedinUser,
}) => {
  const { getPostByUserId, userPost } = useContext(PostContext);
  const { handelUnfriend, sendFriendRequest } = useContext(FriendContext);
  useEffect(() => {
    getPostByUserId(user._id);
  }, [user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center space-y-3 max-h-120 overflow-y-auto">
          {/* <img
            src={user.profilePhoto}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          /> */}
          <img
            src={
              user.profilePhoto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
            }
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />

          <h2 className="text-lg font-bold text-slate-800">{user.name}</h2>

          <p className="text-sm text-slate-500 mb-2">{user.bio}</p>

          <p className="text-sm text-slate-400 mb-4">{user.email}</p>

          <div className="mt-3 flex gap-2 flex-wrap justify-center sm:justify-start">
            {/* 🔥 Suggested Friend */}
            {variant === "suggestion" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sendFriendRequest(user._id);
                }}
                className="px-3 py-1 text-xs rounded bg-[#004953] text-white"
              >
                Add Friend
              </button>
            )}

            {/* 🔥 Friend Request */}
            {variant === "request" && (
              <>
                <button className="px-3 py-1 text-xs rounded bg-[#004953] text-white">
                  Accept
                </button>

                <button className="px-3 py-1 text-xs rounded bg-white border border-[#004953] text-[#004953]">
                  Reject
                </button>
              </>
            )}

            {/* 🔥 Existing Friend */}
            {variant === "friend" && (
              <>
                <button
                  onClick={onMessage}
                  className="px-3 py-1 text-xs rounded bg-[#004953] text-white"
                >
                  Message
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handelUnfriend(user._id, loggedinUser._id);
                  }}
                  className="px-3 py-1 text-xs rounded bg-gray-200 text-gray-700"
                >
                  Unfriend
                </button>
              </>
            )}
          </div>
          <div className="mt-4">
            {userPost?.length > 0 ? (
              userPost.map((p) => <PostCard key={p._id} post={p} />)
            ) : (
              <p className="text-sm text-gray-400 mt-4">No posts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
