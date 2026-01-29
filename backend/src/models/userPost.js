import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who created the post
    text: { type: String, default: "" }, // text content (optional)
    image: { type: [String], default: [] }, // image URL or filename (optional)
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // array of users who liked it
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["0", "1", "2"],
      default: "1",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Post =
  mongoose.models.Post || mongoose.model("Post", userPostSchema);

export default Post;