import React from "react";

const ChatBoxMessages = () => {
  return (
    <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-gray-50">
      {/* Received Message */}
      <div className="max-w-[80%] bg-gray-200 px-4 py-2 rounded-2xl rounded-bl-md self-start">
        <p className="text-sm">Hello 👋</p>
        <span className="text-[11px] opacity-70 mt-1 block">10:30 AM</span>
      </div>

      {/* Sent Message */}
      <div className="max-w-[80%] bg-gray-700 text-white px-4 py-2 rounded-2xl rounded-br-md self-end">
        <p className="text-sm">Hi! How are you?</p>
        <span className="text-[11px] opacity-70 mt-1 block">10:31 AM</span>
      </div>
    </div>
  );
};

export default ChatBoxMessages;
