import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { FaBell } from "react-icons/fa";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [notifications] = useState([
    { id: 1, message: "John liked your post", time: "2m ago" },
    { id: 2, message: "New comment from Sarah", time: "1h ago" },
  ]);

  const open = Boolean(anchorEl);
  const unreadCount = notifications.length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
        onClick={handleClick}
      >
        <FaBell className="text-xl text-[#004953]" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slots={{ transition: Fade }}
        PaperProps={{ style: { width: 300 } }}
      >
        <MenuItem disabled>
          <strong>Notifications</strong>
        </MenuItem>

        {notifications.map((notif) => (
          <MenuItem key={notif.id}>
            <div>
              <p className="font-medium">{notif.message}</p>
              <span className="text-xs text-gray-500">{notif.time}</span>
            </div>
          </MenuItem>
        ))}

        <MenuItem className="justify-center text-[#004953]">See all</MenuItem>
      </Menu>
    </div>
  );
};

export default NotificationMenu;
