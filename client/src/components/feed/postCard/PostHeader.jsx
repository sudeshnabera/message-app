import React from "react";
import { useTimeAgo } from "../../../hooks/useTimeAgo";

const PostHeader = ({ user, createdAt }) => {
  const timeAgo = useTimeAgo(createdAt);

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        <img
          src={user.profilePhoto}
          alt="User"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="font-semibold text-gray-800">{user.name}</div>
          <div className="text-xs text-gray-500">{timeAgo}</div>
        </div>
      </div>

      <button className="w-8 h-8 rounded-full hover:bg-gray-100">⋮</button>
    </div>
  );
};

export default PostHeader;
