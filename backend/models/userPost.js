import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // who created the post
    text: { type: String, default: '' },          // text content (optional)
    image: [{ type: String }],         // image URL or filename (optional)
    createdAt: { type: Date, default: Date.now }, // when the post was made
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // array of users who liked it
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
})

const postModel = mongoose.models.post || mongoose.model('Post', userPostSchema);

export default postModel