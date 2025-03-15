import { Request, Response } from "express";
import Team from "../models/teams";
import teams from "../models/teams";

export async function getTeams(req: Request, res: Response) {
  try {
    const teams = await Team.find();
    const formattedTeams = teams.map((team) => ({
      teamId: team._id,
      teamName: team.teamName,
      leader: team.leader,
      projects: team.projects || [],
    }));

    res.json({ teams: formattedTeams });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching teams", error: error.message });
  }
}

export async function createTeam(req: Request, res: Response) {
  try {
    const { teamName, leader, about, lookingFor } = req.body;

    if (!teamName || !leader || !about || lookingFor === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res
        .status(400)
        .json({
          message: "Team name already exists. Choose a different name.",
        });
    }

    const newTeam: any = new Team({
      teamName,
      leader,
      about,
      lookingFor,
    });

    await newTeam.save();

    res.status(201).json({
      message: "Team created successfully",
      teamId: newTeam._id.toString(),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating team", error: error.message });
  }
}

export async function getLeaderboard(req: Request, res: Response) {
  try {
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;
    const team = await teams.find({});
    let sortedTeams = [...team].sort((a, b) => b.score - a.score);

    if (limit && !isNaN(limit)) {
      sortedTeams = sortedTeams.slice(0, limit);
    }

    res.json(sortedTeams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leaderboard", error: error.message });
  }
}
