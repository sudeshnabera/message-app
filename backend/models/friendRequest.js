import mongoose from "mongoose"; 

const friendListSchema  = new mongoose.Schema ({
          senderId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User', // Reference to User model
              required: true
            },
            receiverId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User', // Reference to User model
              required: true
            },
            status: {
              type: String,
              enum: ['pending', 'accepted', 'rejected'],
              default: 'pending'
            },
            createdAt: {
              type: Date,
              default: Date.now
            },
            updatedAt: {
              type: Date,
              default: Date.now
            }
          });

          // Indexes for performance
          friendListSchema.index({ senderId: 1 });
          friendListSchema.index({ receiverId: 1 });
          friendListSchema.index({ status: 1 });

const friendListModel = mongoose.models.friendlist || mongoose.model("FriendList", friendListSchema);

 export default friendListModel;