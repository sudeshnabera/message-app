
import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// Register a new user
const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    phone,
    name,
    bio,
    dob,
    gender,
    profilePhoto,
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

      //validating email format and Strong Password
      if (!validator.isEmail(email)) {
          return res.json({success:false, message:"Please enter valid email"})
      }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await userModel.create({
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

    // Send success response
    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res
      .json({ message: "Error registering user", error: err.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({  $or: [
                                            { email: emailOrUsername },
                                            { username: emailOrUsername }
                                          ] });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = createToken(user._id)
    // Send response with token
    res.json({
      token,
      success:true
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


export {registerUser, loginUser};