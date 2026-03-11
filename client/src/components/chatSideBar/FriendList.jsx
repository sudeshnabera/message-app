import React, { useContext, useEffect } from "react";
import FriendItem from "./FriendItem";
import { FriendContext } from "../../context/FriendContext";

const FriendList = () => {
  const { friends, fetchFriends  } = useContext(FriendContext)
  
  useEffect(()=>{
    fetchFriends()
  },[])

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Active Friend */}

      {friends.map((f)=>(
        <FriendItem
        img={f.profilePhoto}
        name={f.name}
        message={"Hey! Are we meeting today?"}
      />
      ))}
      
    </div>
  );
};

export default FriendList;
