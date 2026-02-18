import React from "react";
import {
  Paperclip,
  Camera,
  SmilePlus,
  Mic,
  Send,
  Video,
  Phone,
} from "lucide-react";
import ChatBoxHeader from "./ChatBoxHeader.jsx";
import ChatBoxMessages from "./ChatBoxMessages.jsx";

const ChatBox = () => {
  return (
    <div className="w-full h-162.5 bg-white shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <ChatBoxHeader />
      {/* Messages */}
      <ChatBoxMessages />
      {/* Input Section */}
      <div className="border-t p-4">
        {/* Preview Images */}
        {/* <div className="flex gap-2 mb-2">
          <img
            src="https://via.placeholder.com/100"
            alt="preview"
            className="w-20 rounded"
          />
        </div> */}

        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-[#004953]">
              {/* <i className="fas fa-file-alt"></i> */}
              <Paperclip size={20} />
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-[#004953]">
              <SmilePlus size={20} />
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-[#004953]">
              <Camera size={20} />
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-[#004953]">
              <Mic size={20} />
            </button>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm px-2"
          />

          {/* Send Button */}
          <button className="bg-[#004953] text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#00363f] transition">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
