// import { Request, Response } from "express";
// import Whiteboard from "../models/whiteboard";

// export async function saveWhiteboard(req: Request, res: Response) {
//     try {
//         const { teamId, content } = req.body;

//         if (!teamId || !content) {
//             return
//             res.status(400).json({ message: "teamId and content are required" });
//         }

//         const newWhiteboard = new Whiteboard({ teamId, content });
//         await newWhiteboard.save();

//         res.json({ message: "Whiteboard saved successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error saving whiteboard", error: error.message });
//     }
// }
import { Request, Response } from "express";
import {
  getWhiteboardByTeam,
  updateWhiteboard,
} from "../services/whiteboardService";

//Fetch a whiteboard by teamId
export const fetchWhiteboard = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  try {
    const whiteboard = await getWhiteboardByTeam(teamId);
    res.status(200).json(whiteboard);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Save a new whiteboard
export const saveWhiteboard = async (req: Request, res: Response) => {
  const { teamId, content } = req.body;
  try {
    const updatedBoard = await updateWhiteboard(teamId, content);
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Update an existing whiteboard (PUT request)
export const updateWhiteboardContent = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { content } = req.body;

  try {
    const updatedBoard = await updateWhiteboard(teamId, content);
    res
      .status(200)
      .json({ message: "Whiteboard updated successfully", updatedBoard });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
