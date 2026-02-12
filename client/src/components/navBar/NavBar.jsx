import React, { useContext, useState } from "react";
import styles from "./NavBar.Module.css";
import { AuthContext } from "../../context/AuthContext";
import {
  FaHome,
  FaBell,
  FaUserFriends,
  FaUserPlus,
  FaUserCheck,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [friendOpen, setFriendOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
          <a
            href="/home"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaHome className="text-xl text-[#004953]" />
          </a>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FaBell className="text-xl text-[#004953]" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border">
                <div className="p-3 font-semibold border-b">Notifications</div>

                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                  <p className="font-medium">John liked your post</p>
                  <span className="text-xs text-gray-500">2m ago</span>
                </div>

                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                  <p className="font-medium">New comment from Sarah</p>
                  <span className="text-xs text-gray-500">1h ago</span>
                </div>

                <div className="text-center py-2 text-[#004953] font-medium hover:bg-gray-100 cursor-pointer">
                  See all
                </div>
              </div>
            )}
          </div>

          {/* Friends Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFriendOpen(!friendOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FaUserFriends className="text-xl text-[#004953]" />
            </button>

            {friendOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border">
                <a
                  href="/user/list"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <FaUserPlus className="text-[#004953]" />
                  Add Friends
                </a>

                <a
                  href="/friend/request"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <FaUserCheck className="text-[#004953]" />
                  Friend Requests
                </a>

                <a
                  href="/friends"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <FaUserFriends className="text-[#004953]" />
                  Friends
                </a>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="rounded-full overflow-hidden w-10 h-10 border-2 border-[#004953]"
            >
              <img
                src={user?.profilePhoto || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg border">
                <div className="p-4 border-b text-center">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.bio}</p>
                </div>

                <a
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <FaUser className="text-[#004953]" />
                  My Profile
                </a>

                <a
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <FaCog className="text-[#004953]" />
                  Settings
                </a>

                <button className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-100">
                  <FaSignOutAlt className="text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
