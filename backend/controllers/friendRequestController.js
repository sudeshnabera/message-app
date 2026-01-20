import { StatusError } from "../config/statusError.js";
import { userService, friendService } from "../services/index.js";

const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { receiverId } = req.body;
    if (senderId === receiverId) {
      throw StatusError.badRequest("You can't send a request to yourself.");
    }

    // Check if receiver exists in User model
    await userService.getUserById(receiverId);

    // Check if a friend request already exists (in either direction)
    await friendService.getFriendStatus(senderId, receiverId);

    // Create new friend request
    await friendService.createFriendRequest(senderId, receiverId);

    res.json({
      success: true,
      message: "Friend request sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error sending friend request",
      error: err.message,
    });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch all friend requests where current user is the receiver
    const requests = await friendService.getAllFriendRequests(userId);

    res.json({ success: true, friendRequests: requests });
  } catch (err) {
    res.json({ message: "Error fetching friend requests", error: err.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { requestId } = req.body;

    // Find the friend request
    const friendRequest = await friendService.getFriendRequestById(
      requestId,
      userId
    );

    if (!friendRequest) {
      return res.json({
        message: "Friend request not found or already processed.",
      });
    }

    // Update the status to "accepted"
    friendRequest.status = "accepted";
    await friendRequest.save();

    res.json({
      success: true,
      message: "Friend request accepted successfully.",
    });
  } catch (err) {
    console.error("Error accepting friend request:", err);
    res.status(500).json({
      success: false,
      message: "Error accepting friend request",
      error: err.message,
    });
  }
};

const getAcceptedFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch all friend requests where current user is the receiver
    const requests = await friendListModel
      .find({
        status: "accepted",
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .populate("senderId", "name email bio bod phone gender profilePhoto")
      .populate("receiverId", "name email bio bod phone gender profilePhoto")
      .sort({ createdAt: -1 });
    const friendList = requests.map((req) => {
      const friend =
        req.senderId._id.toString() === userId.toString()
          ? req.receiverId
          : req.senderId;
      return friend;
    });
    res.json({ success: true, friendList });
  } catch (error) {
    res.json({ success: false });
  }
};

export {
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  getAcceptedFriend,
};
