import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      trim: true,
    },
    bio: {
      type: String,
      default: null,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      default: null,
      trim: true,
      maxlength: 30,
    },
    dob: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["0", "1", "2"], // 0: offline, 1: online, 2: busy
      default: "1",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// Transform to exclude password when converting to JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
