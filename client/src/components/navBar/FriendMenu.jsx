import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { FaUserFriends, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const FriendMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaUserFriends className="text-xl text-[#004953]" />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slots={{ transition: Fade }}
        PaperProps={{ style: { width: 300 } }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/add-friend"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <FaUserPlus className="text-[#004953]" />
            Add Friends
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="/friend/request"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <FaUserCheck className="text-[#004953]" />
            Friend Requests
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="/friends"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <FaUserFriends className="text-[#004953]" />
            Friends
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FriendMenu;
