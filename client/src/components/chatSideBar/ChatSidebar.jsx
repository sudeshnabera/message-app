import React, { useState } from "react";
import SideBarHeader from "./SideBarHeader";
import FriendList from "./FriendList";
import GroupList from "./GroupList";
import CreateGroupModal from "./CreateGroupModal"
const ChatSidebar = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="w-75 h-[calc(100vh-80px)] bg-white border-r border-gray-300 shadow-sm flex flex-col">
      <SideBarHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Friend List */}
      {activeTab === "friends" ? <FriendList /> : <GroupList />}

      {/* Bottom Create Group Button */}
      <div className="p-4 border-t border-gray-300 shadow-sm">
        <button onClick={toggleModal} className="w-full bg-[#004953] text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
          + Create Group
        </button>
      </div>
     {isModalOpen && <CreateGroupModal  handleClose={toggleModal}/>} 
    </div>
  );
};
export default ChatSidebar;
