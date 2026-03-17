import { useContext, useState, useEffect } from "react";
import { Paperclip, Camera, SmilePlus, Mic, Send } from "lucide-react";
import ChatBoxHeader from "./ChatBoxHeader.jsx";
import ChatBoxMessages from "./ChatBoxMessages.jsx";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { MessageContext } from "../../context/MessageContext";

const ChatBox = () => {
  const { messages, fetchMessages, setMessages } = useContext(MessageContext);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const name = location.state?.name;
  const img = location.state?.img;
  const receiverId = location.state?.id;
  const socket = useSocket();

  useEffect(() => {
    fetchMessages(receiverId);
  }, [receiverId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      content: message,
      sender: user._id,
      receiver: receiverId,
    };

    socket.emit("send_message", newMessage);

    // optimistic UI update
    // setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className="w-full h-162.5 bg-white shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <ChatBoxHeader name={name} img={img} />
      {/* Messages */}
      <ChatBoxMessages messages={messages} currentUserId={user?._id} />
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
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm px-2"
          />

          {/* Send Button */}
          <button
            onClick={sendMessage}
            className="bg-[#004953] text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#00363f] transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
