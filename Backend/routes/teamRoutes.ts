import express from "express";
import {
  createTeam,
  getLeaderboard,
  getTeams,
} from "../controllers/teamControllers.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/leaderboard", getLeaderboard);
router.post("/", (req, res) => {
  createTeam(req, res);
});

export default router;
