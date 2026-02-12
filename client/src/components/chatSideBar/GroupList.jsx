import React from "react";
import GroupItem from "./GroupItem";

const GroupList = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <GroupItem name={"Project Team"} img={"https://i.pravatar.cc/150?img=5"} />
      <GroupItem name={"College Team"} img={"https://i.pravatar.cc/150?img="} />
      <GroupItem name={"School Team"} img={"https://i.pravatar.cc/150?img=8"} />

    </div>
  );
};

export default GroupList;
