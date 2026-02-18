import React from "react";
import { useNavigate } from "react-router-dom";

const GroupItem = ({name, img}) => {
   const navigate = useNavigate();
  const openChat = () => {
    navigate(`/chat/group`);
  };
  return (
    <div onClick={openChat}
     className="flex items-center gap-3 py-3 px-4  hover:bg-gray-100 cursor-pointer transition">
      <img
        src={img}
        alt="group"
        className="w-11 h-11 rounded-full border border-[#004953] object-cover"
      />
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
};

export default GroupItem;
