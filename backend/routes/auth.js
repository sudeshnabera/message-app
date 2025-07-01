import express from "express"
import { loginUser, registerUser} from '../controllers/authController.js';
const authRouter = express.Router();


// POST /api/auth/register
authRouter.post("/register", registerUser);

// POST /api/auth/login
authRouter.post("/login", loginUser);

export default authRouter;