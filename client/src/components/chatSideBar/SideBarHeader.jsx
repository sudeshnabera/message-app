import React from "react";
import TabButton from "./TabButton";

const SideBarHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="p-4 border-b border-gray-300 shadow-sm sticky top-0 bg-white z-10">
      <h2 className="text-xl font-bold text-[#004953] mb-3">Chats</h2>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full pl-4 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#004953]"
        />
      </div>

      {/* Filter Buttons */}
      <TabButton activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default SideBarHeader;
