import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  groupPhoto: {
      type: String,
      default: null,
    }
});

const groupModel = mongoose.models.group || mongoose.model('Group', groupSchema);

export default groupModel