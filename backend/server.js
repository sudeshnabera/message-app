import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import {
  authRouter,
  userRoute,
  friendRoute,
  createGroups,
  postRoute,
  messageRoute,
} from "./routes/index.js";
import { StatusError } from "./config/statusError.js";
import { createMessage } from "./controllers/messageController.js";
import { errors } from "celebrate";
import "dotenv/config";

//app connection
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  createMessage(io, socket);
});

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  "/images",
  express.static("uploads/posts", {
    setHeaders: (res, path) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/friend", friendRoute);
app.use("/api/groups", createGroups);
app.use("/api/post", postRoute);
app.use("/api/messages", messageRoute);

//database connection
connectDB();

app.use(errors());
app.use(StatusError);
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
