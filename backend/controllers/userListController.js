import { friendService, userService } from "../services/index.js";

export const getDiscoverUsers = async (req, res) => {
  try {
    let userId = req.user.userId;
    const friendConnections =
      await friendService.getUserFriendConnections(userId);
    const excludedUserIds = new Set([userId.toString()]);
    friendConnections.forEach((c) => {
      if (c.senderId.toString() !== userId.toString()) {
        excludedUserIds.add(c.senderId.toString());
      }
      if (c.receiverId.toString() !== userId.toString()) {
        excludedUserIds.add(c.receiverId.toString());
      }
    });

    // Step 3: Query users who are not self and not already connected
    let users = await userService.getUsers(userId, excludedUserIds);
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error in getDiscoverUsers:", error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};
