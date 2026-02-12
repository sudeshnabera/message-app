import React from "react";

const FriendItem = ({name,img,message}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
      <div className="relative">
        <img
          src={img}
          alt="friend"
          className="w-11 h-11 rounded-full object-cover border border-[#004953]"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500 truncate">
          {message}
        </p>
      </div>
    </div>
  );
};

export default FriendItem;
