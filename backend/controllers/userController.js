import { userService } from "../services/index.js";
import { hashPassword, comparePassword } from "../helper/index.js";
// Fetch profile details of the logged-in user
const getProfile = async (req, res) => {
  console.log("Get profile controller executed", req.user);
  try {
    const userId = req.user.id; // Assuming `req.user` is populated by middleware
    const user = await userService.getUserById(userId);

    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the logged-in user's ID from the token
    const { name, email, bio, phone, dob, password } = req.body;
    let profilePhoto = null;
    if (req.file) {
      profilePhoto = req.file.filename;
    }
    // const user = await userService.getUserById(userId);
    const hashedPassword = await hashPassword(password);

    // user.name = name || user.name;
    // user.email = email || user.email;
    // user.password = hashedPassword || user.password;
    // user.bio = bio || user.bio;
    // user.phone = phone || user.phone;
    // user.dob = dob || user.dob;
    // user.profilePhoto = profilePhoto || user.profilePhoto;

    // await user.save();

    let updatedData = {
      name,
      email,
      bio,
      phone,
      dob,
      profilePhoto,
      password: hashedPassword,
    };

    const user = await userService.updateUser(userId, updatedData);

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

export { getProfile, updateProfile };
