import React from "react";
import FriendItem from "./FriendItem";

const FriendList = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Active Friend */}
      <FriendItem
        img={"https://i.pravatar.cc/150?img=1"}
        name={"John Doe"}
        message={"Hey! Are we meeting today?"}
      />

      <FriendItem
        img={"https://i.pravatar.cc/150?img=2"}
        name={"Sarah Smith"}
        message={"See you tomorrow 🙂"}
      />

      <FriendItem
        img={"https://i.pravatar.cc/150?img=3"}
        name={"Alex Johnson"}
        message={" Let's start the project."}
      />
    </div>
  );
};

export default FriendList;
