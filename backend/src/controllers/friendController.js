import { friendService } from "../services/index.js";

export const getAllFriends = async (req, res) => {
  const userId = req.user.userId; // Logged-in user's ID

  try {
    const friends = await friendService.getAllFriends(userId);

    const friendList = friends.map((friend) => {
      if (friend.senderId._id.equals(userId)) {
        return friend.receiverId;
      } else {
        return friend.senderId;
      }
    });

    // const uniqueFriends = [];
    // const friendIds = new Set();

    // for (const friend of friendList) {
    //   if (!friendIds.has(friend._id)) {
    //     friendIds.add(friend._id);
    //     uniqueFriends.push(friend);
    //   }
    // }

    res.status(200).json({ friends: friendList });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res
      .status(500)
      .json({ message: "Error fetching friends", error: error.message });
  }
};
