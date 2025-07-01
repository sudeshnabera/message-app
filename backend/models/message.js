import mongoose from "mongoose";  

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  });

  const messageModel = mongoose.models.messages || mongoose.model("Messages", messageSchema);
  
  export default messageModel;