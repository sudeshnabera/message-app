import { createContext, useState, useEffect } from "react";
import { getAllMessage } from "../services/message.services";
import { useSocket } from "../hooks/useSocket";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      console.log("newMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const fetchMessages = async (receiverId) => {
    const res = await getAllMessage(receiverId);
    setMessages(res.data.messages);
  };

  return (
    <MessageContext.Provider value={{ messages, fetchMessages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
