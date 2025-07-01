import userModel from "../models/user.js";
import friendListModel from "../models/friendRequest.js";

const getAllUsers = async (req, res) => {
   const userId = req.user.id;
  try {
    
     const friendRequests = await friendListModel.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    });

    // Step 2: Collect IDs of users already connected via any friend request
    const connectedUserIds = new Set();
    friendRequests.forEach(req => {
      if (req.senderId.toString() !== userId) {
        connectedUserIds.add(req.senderId.toString());
      }
      if (req.receiverId.toString() !== userId) {
        connectedUserIds.add(req.receiverId.toString());
      }
    });

    // Step 3: Query users who are not self and not already connected
    const users = await userModel.find({
      _id: {
        $ne: userId,
        $nin: Array.from(connectedUserIds),
      }
    });

    res.json({ success: true, users });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }

};

export { getAllUsers }; 
