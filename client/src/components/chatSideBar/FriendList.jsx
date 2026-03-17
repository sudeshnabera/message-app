import FriendItem from "./FriendItem";

const FriendList = ({friends}) => {
  

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Active Friend */}

      {friends?.length > 0 ? (
        friends?.map((f) => (
          <FriendItem
            key={f._id}
            img={f.profilePhoto}
            name={f.name}
            id={f._id}
            message={"Hey! Are we meeting today?"}
          />
        ))
      ) : (
        <div>No Friends</div>
      )}
    </div>
  );
};

export default FriendList;
