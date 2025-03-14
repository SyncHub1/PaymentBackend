import { Server, Socket } from "socket.io";
import {
  getWhiteboardByTeam,
  updateWhiteboard,
} from "../services/whiteboardService";

export const handleWhiteboardSockets = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", async (teamId: string) => {
      socket.join(teamId);
      const whiteboard = await getWhiteboardByTeam(teamId);
      socket.emit("load-whiteboard", whiteboard?.content || "{}");
    });

    socket.on("update-whiteboard", async ({ teamId, content }) => {
      await updateWhiteboard(teamId, content);
      socket.to(teamId).emit("update-whiteboard", content);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
