import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserProfileModal from "../friends/UserProfileModal";

const ProfileMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="rounded-full overflow-hidden w-10 h-10 border-2 border-[#004953]"
      >
        <img
          src={
            user?.profilePhoto ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=random`
          }
          alt={user?.name}
          className="w-full h-full object-cover"
        />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slots={{ transition: Fade }}
        PaperProps={{ style: { width: 180 } }}
      >
        <MenuItem
          className="justify-center text-[#004953]"
          onClick={() => {
            setSelectedUser(user);
            handleClose();
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
            <FaUser className="text-[#004953]" />
            My Profile
          </div>
        </MenuItem>
        <MenuItem
          className="justify-center text-[#004953]"
          onClick={handleClose}
        >
          <a
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <FaCog className="text-[#004953]" />
            Settings
          </a>
        </MenuItem>
        <MenuItem
          className="justify-center text-[#004953]"
          onClick={handleClose}
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-100"
          >
            <FaSignOutAlt className="text-red-500" />
            Logout
          </button>
        </MenuItem>
      </Menu>
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          variant="self-profile"
        />
      )}
    </div>
  );
};

export default ProfileMenu;
