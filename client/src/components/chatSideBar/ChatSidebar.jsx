import React, { useState, useContext, useEffect } from "react";
import SideBarHeader from "./SideBarHeader";
import FriendList from "./FriendList";
import GroupList from "./GroupList";
import CreateGroupModal from "./CreateGroupModal";
import { FriendContext } from "../../context/FriendContext";
import { GroupContext } from "../../context/GroupContext";

const ChatSidebar = () => {
  const { friends, fetchFriends } = useContext(FriendContext);
  const { handleGroup } = useContext(GroupContext);
  const [activeTab, setActiveTab] = useState("friends");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="w-75 h-[calc(100vh-80px)] bg-white border-r border-gray-300 shadow-sm flex flex-col">
      <SideBarHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Friend List */}
      {activeTab === "friends" ? (
        <FriendList friends={friends} />
      ) : (
        <GroupList />
      )}

      {/* Bottom Create Group Button */}
      <div className="p-4 border-t border-gray-300 shadow-sm">
        <button
          onClick={toggleModal}
          className="w-full bg-[#004953] text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
        >
          + Create Group
        </button>
      </div>
      {isModalOpen && (
        <CreateGroupModal
          friends={friends}
          handleClose={toggleModal}
          handleGroup={handleGroup}
        />
      )}
    </div>
  );
};
export default ChatSidebar;
