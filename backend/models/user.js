
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: null,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    }

},{minimize: false})

const userModel = mongoose.models.user || mongoose.model("User", userSchema);

 export default userModel;