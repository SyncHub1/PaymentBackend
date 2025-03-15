import express from "express";
import http from "http"; 
import { Server as SocketServer } from "socket.io";
import teamRoutes from "../routes/teamRoutes.js";
import whiteboardRoutes from "../routes/whiteboardRoutes.js";
import connectDB from "../config/db.js";
import { handleWhiteboardSockets } from "../socket/whiteboardSocket.js"; 
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();

const app = express();
const server = http.createServer(app); 
const io = new SocketServer(server, { cors: { origin: "*" } }); 

app.use(express.json());

app.use("/api/teams", teamRoutes);
app.use("/api/whiteboard", whiteboardRoutes);


handleWhiteboardSockets(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
