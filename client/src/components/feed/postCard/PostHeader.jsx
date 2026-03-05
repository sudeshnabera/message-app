import React from "react";
import { useTimeAgo } from "../../../hooks/useTimeAgo";

const PostHeader = ({ user, createdAt }) => {
  const timeAgo = useTimeAgo(createdAt);

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        {/* <img
          src={user.profilePhoto}
          alt="User"
          className="w-12 h-12 rounded-full"
        /> */}
        <img
          src={
            user.profilePhoto ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
          }
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
        />

        <div>
          <div className="font-semibold text-gray-800">{user.name}</div>
          <div className="text-xs text-gray-500">{timeAgo}</div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
