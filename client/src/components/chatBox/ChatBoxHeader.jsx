import React from "react";
import { Video, Phone } from "lucide-react";

const ChatBoxHeader = () => {
  return (
    <div className="bg-[#004953] text-white px-5 py-4 flex items-center border-b">
      <div className="flex items-center">
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt="avatar"
          className="w-11 h-11 rounded-full mr-3"
        />
        <div>
          <h2 className="text-sm font-semibold">John Doe</h2>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>

      <div className="ml-auto flex gap-4">
        <button className="opacity-80 hover:opacity-100 transition">
          <Phone size={20} />
        </button>
        <button className="opacity-80 hover:opacity-100 transition">
          <Video size={25} />
        </button>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
