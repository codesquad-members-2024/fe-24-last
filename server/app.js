import express from "express";
import pagesRouter from "./routes/pagesRoute.js";
import "dotenv/config";
import cors from "cors";
import connectDB from "./mongodb.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const port = 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());

connectDB();

app.use(express.json());
app.use("/", pagesRouter);

app.get("/", (req, res) => {
  res.send("하이!");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("join_room", (pageId) => {
    socket.join(pageId);
    console.log(`Socket ${socket.id} joined room ${pageId}`);
  });

  socket.on("leave_room", (pageId) => {
    socket.leave(pageId);
    console.log(`Socket ${socket.id} left room ${pageId}`);
  });

  socket.on("title_updated", ({ pageId, newTitle }) => {
    console.log("Title updated:", newTitle, "for room:", pageId);
    io.to(pageId).emit("title_updated", newTitle);
  });

  socket.on("block_updated", ({ pageId, blocks }) => {
    console.log("Blocks updated for room:", pageId);
    io.to(pageId).emit("block_updated", blocks);
  });

  socket.on("block_content_updated", ({ pageId, blockId, newContent }) => {
    console.log(`Block content updated: ${pageId}, block: ${blockId}, ${newContent}`);
    io.to(pageId).emit("block_content_updated", { blockId, newContent });
  });
});

app.listen(port, () => {
  console.log(`port ${port}`);
});

io.listen(3001, () => {
  console.log("port 3001");
});
