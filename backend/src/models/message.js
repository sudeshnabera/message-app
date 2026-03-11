import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: false,
    },
    content: { type: String, required: true },
    attachments: [{ type: String, required: false }],
  },
  { timestamps: true },
);

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
