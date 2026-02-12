import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "../pages/auth/Signup.jsx";
import Login from "../pages/auth/Login.jsx";

import AuthLayout from "../layout/AuthLayout.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import NavBar from "../components/navBar/NavBar.jsx";
import ChatSidebar from "../components/chatSideBar/ChatSidebar.jsx";
import FeedPage from "../pages/feed/FeedPage.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/navbar" element={<NavBar />}/>
          <Route path="/chat-sidebar" element={<ChatSidebar/>}/>
          <Route path="/home" element={<FeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
