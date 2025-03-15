import Whiteboard from "../models/whiteboard.js";

export const getWhiteboardByTeam = async (teamId: string) => {
    return await Whiteboard.findOne({ teamId });
};

export const updateWhiteboard = async (teamId: string, content: string) => {
    return await Whiteboard.findOneAndUpdate({ teamId }, { content }, { new: true, upsert: true });
};
