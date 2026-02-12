import React from "react";

const TabButton = ({activeTab, setActiveTab}) => {
  return (
    <div className="flex gap-3 mt-3">
      <button
        onClick={() => setActiveTab("friends")}
        className={`px-4 py-1 text-sm rounded-full transition ${activeTab === "friends" ? " bg-[#004953] text-white" : "border border-[#004953] text-[#004953] hover:bg-[#004953] hover:text-white transition"}`}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab("groups")}
        className={`px-4 py-1 text-sm rounded-full transition ${activeTab === "groups" ? " bg-[#004953] text-white" : "border border-[#004953] text-[#004953] hover:bg-[#004953] hover:text-white transition"}`}
      >
        Groups
      </button>
    </div>
  );
};

export default TabButton;
