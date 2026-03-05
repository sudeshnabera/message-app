import React, { useContext } from "react";
import { FriendContext } from "../../context/FriendContext";

const FriendCard = ({ user, onClick, variant, onMessage, loggedinUser }) => {
  const { handelUnfriend, sendFriendRequest,  } = useContext(FriendContext);

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#004953]/30 rounded-xl p-4 hover:shadow-md transition"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
        {/* <img
          src={user.profilePhoto}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover"
        /> */}

        <img
          src={
            user.profilePhoto ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
          }
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
        />

        <div className="flex-1 w-full">
          <h3 className="text-sm font-semibold text-slate-800">{user.name}</h3>

          <p className="text-xs text-slate-500">{user.bio}</p>
          <p className="text-[0.8rem] text-slate-500 mb-4">{user.email}</p>

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
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
