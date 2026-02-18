import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "../pages/auth/Signup.jsx";
import Login from "../pages/auth/Login.jsx";

import AuthLayout from "../layout/AuthLayout.jsx";
import MainLayout from "../layout/MainLayout.jsx";
// import NavBar from "../components/navBar/NavBar.jsx";
// import ChatSidebar from "../components/chatSideBar/ChatSidebar.jsx";
import FeedPage from "../pages/feed/FeedPage.jsx";
import ChatSection from "../pages/chats/ChatSection.jsx";
import AddFriends from "../pages/friends/AddFriends.jsx";
import FriendRequests from "../pages/friends/FriendRequests.jsx";
import Friends from "../pages/friends/Friends.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          {/* <Route path="/navbar" element={<NavBar />}/>
          <Route path="/chat-sidebar" element={<ChatSidebar/>}/> */}
          <Route path="/home" element={<FeedPage />} />
          <Route path="/chat" element={<ChatSection />} />
          <Route path="/chat/group" element={<ChatSection />} />
          <Route path="/add-friend" element={<AddFriends />} />
          <Route path="/friend/request" element={<FriendRequests />} />
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
