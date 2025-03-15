import express from "express";
import {
  fetchWhiteboard,
  saveWhiteboard,
  updateWhiteboardContent, 
} from "../controllers/whiteboardController.js";

const router = express.Router();

router.get("/:teamId", fetchWhiteboard);
router.post("/", saveWhiteboard);
router.put("/:teamId", updateWhiteboardContent); 
export default router;
