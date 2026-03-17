import { createContext, useEffect } from "react";
import { socket } from "../services/socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  let user = JSON.parse(localStorage.getItem("user"));
    
  useEffect(() => {
    if (user) {
      socket.connect();
      console.log("Socket connected");
      socket.emit("register_user", user._id)
    } else {
      socket.disconnect();
      console.log("Socket disconnected (logout)");
    }
    return () => {
      socket.off();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
