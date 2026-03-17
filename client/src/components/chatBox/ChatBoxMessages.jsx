const ChatBoxMessages = ({ messages, currentUserId }) => {
  return (
    <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-gray-50">
      {/* Received Message */}
      {messages?.map((msg) => {
        const isSender = msg?.sender === currentUserId;

        return (
          <div
            key={msg?._id}
            className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-2 rounded-lg ${
                isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg?.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBoxMessages;
