import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import ChatSidebar from "../components/chatSideBar/ChatSidebar";
const MainLayout = () => {
  return (
    // <div className="h-screen flex flex-col bg-gray-100">
    //   {/* Top Navbar */}
    //   <NavBar />

    //   {/* Body Section */}
    //   <div className="flex flex-1 overflow-hidden">
    //     {/* Left Sidebar */}
    //     <ChatSidebar />

    //     {/* Right Chat Area */}
    //     <div className="flex-1 bg-white  overflow-y-auto">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
    <div className="h-screen flex flex-col bg-[#f4f6f9]">

      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-70 bg-white border-r border-gray-200">
          <ChatSidebar />
        </div>

        {/* Main Content Only */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default MainLayout;
