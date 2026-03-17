import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PostProvider } from "./context/PostContext.jsx";
import { FriendProvider } from "./context/FriendContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { MessageProvider } from "./context/MessageContext.jsx";
import { GroupProvider } from "./context/GroupContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SocketProvider>
      <PostProvider>
        <FriendProvider>
          <MessageProvider>
            <GroupProvider>
              <App />
            </GroupProvider>
          </MessageProvider>
        </FriendProvider>
      </PostProvider>
    </SocketProvider>
  </AuthProvider>,
);
