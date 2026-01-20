import userModel from "../models/user.js";
import groupModel from "../models/group.js";
import friendListModel from "../models/friends.js";

const createGroups = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupPhoto, name, memberIds } = req.body;
    const validMembers = await friendListModel.find({
      status: "accepted",
      $or: [
        { senderId: userId, receiverId: { $in: memberIds } },
        { receiverId: userId, senderId: { $in: memberIds } },
      ],
    });

    // Collect valid user IDs from accepted friend entries
    const allowedUserIds = validMembers.map((f) =>
      f.senderId.toString() === userId ? f.receiverId : f.senderId,
    );

    const group = new groupModel({
      name,
      groupPhoto,
      createdBy: userId,
      members: [userId, ...allowedUserIds], // include creator
    });

    await group.save();
    res.json({ success: true, group });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const fetchUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Groups created by the user
    const createdGroups = await groupModel
      .find({ createdBy: userId })
      .populate("members", "name email") // optional
      .populate("createdBy", "name email"); // optional

    // 2. Groups where user is a member but not creator
    const memberGroups = await groupModel
      .find({
        members: userId,
        createdBy: { $ne: userId },
      })
      .populate("members", "name email")
      .populate("createdBy", "name email");

    const allGroups = [...createdGroups, ...memberGroups];

    res.json({
      success: true,
      allGroups,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { createGroups, fetchUserGroups };
