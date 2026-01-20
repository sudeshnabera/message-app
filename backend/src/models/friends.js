import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  
},{ timestamps: true });

// Indexes for performance
friendsSchema.index(
  { senderId: 1, receiverId: 1 },
  { unique: true }
);
const Friends =
  mongoose.models.Friends || mongoose.model("Friends", friendsSchema);

export default Friends;
