
import { userService } from "../services/index.js";
import { hashPassword, comparePassword } from "../helper/index.js";
import { StatusError } from "../config/statusError.js";

const registerUser = async (req, res) => {
  const { username, email, password, phone, name, bio, dob, gender } = req.body;
  try {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw StatusError.conflict("User with this email already exists");
    }
    const hashedPassword = await hashPassword(password);
    let profilePhoto = null;
    if (req.file) {
      profilePhoto = req.file.filename;
    }
    await userService.createUser({
      username,
      email,
      password: hashedPassword,
      phone,
      name,
      bio,
      dob,
      gender,
      profilePhoto,
    });

    res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Error in logging",
    });
  }
};

const loginUser = async (req, res) => {
  console.log("function called");
  
  const { emailOrUsername, password } = req.body;
  try {
    // Find user by email
    const user = await userService.getUserByUsernameAndEmail({
      emailOrUsername
    });

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw StatusError.unauthorized("Invalid credentials");
    }

    // Create JWT token
    const token = await userService.generateTokens(user._id);
    if (!token) {
      throw StatusError.badRequest("Token generation failed");
    }
    console.log("token", token,);
    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Error in logging",
    });
  }
};

export { registerUser, loginUser };
