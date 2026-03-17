import { StatusError } from "../config/statusError.js";
import groupModel from "../models/group.js";
import { friendService, groupService } from "../services/index.js";

const createGroups = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, memberIds } = req.body;

    if (!name?.trim()) {
      throw StatusError.badRequest("Group name is required");
    }

    if (
      !Array.isArray(JSON.parse(memberIds)) ||
      JSON.parse(memberIds).length < 2
    ) {
      throw StatusError.badRequest("Group must have at least 2 members");
    }
    let groupPhoto = null;
    if (req.file) {
      groupPhoto = req.file.filename;
    }
    const validMembers = await friendService.getGroupMember(
      userId,
      JSON.parse(memberIds),
    );

    // Collect valid user IDs from accepted friend entries
    const allowedUserIds = validMembers.map((f) =>
      f.senderId.toString() === userId ? f.receiverId : f.senderId,
    );

    const group = {
      name,
      groupPhoto,
      createdBy: userId,
      members: [userId, ...allowedUserIds], // include creator
    };

    await groupService.createGroup(group);

    res
      .status(200)
      .json({ success: true, message: "Group Create Successfull" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
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
