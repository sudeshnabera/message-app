import React, { useContext, useRef, useState } from "react";
import styles from "./NavBar.Module.css";
import { AuthContext } from "../../context/AuthContext";
import HomeMenu from "./HomeMenu";
import NotificationMenu from "./NotificationMenu";
import FriendMenu from "./FriendMenu";
import ProfileMenu from "./ProfileMenu";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="sticky top-0 bg-white shadow-sm px-6 py-3 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h3 className="text-2xl font-bold text-[#004953] relative">
          Talksy
          <span className="absolute left-0 bottom-0 w-16 h-0.75 bg-liner-to-r from-[#004953] to-transparent rounded"></span>
        </h3>

        <div className="flex items-center gap-6">
          {/* Home */}
          <HomeMenu />

          {/* Notifications */}
          <NotificationMenu />

          {/* Friends Dropdown */}
          <FriendMenu />

          {/* Profile Dropdown */}
          <ProfileMenu user={user}/>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
