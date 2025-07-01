
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import userModel from "../models/user.js";

// Fetch profile details of the logged-in user
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` is populated by middleware
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};


const updateProfile = async (req, res) => {
  const userId = req.user.id; // Get the logged-in user's ID from the token
  const { name, email, bio, phone, dob, password, profilePhoto } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;
    user.profilePhoto = profilePhoto || user.profilePhoto;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

export { getProfile, updateProfile }