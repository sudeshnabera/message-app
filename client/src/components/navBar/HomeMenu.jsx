import React from "react";
import { FaHome } from "react-icons/fa";

const HomeMenu = () => {
  return (
    <a href="/home" className="p-2 rounded-full hover:bg-gray-100 transition">
      <FaHome className="text-xl text-[#004953]" />
    </a>
  );
};

export default HomeMenu;
