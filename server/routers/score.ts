import { PrismaClient, User } from "@prisma/client";
import express, { Router } from "express";
import {
  createUser,
  getUserByName,
  getUsers,
  getPlayerScore,
  updatePlayerScore,
  getScores,
} from "../services/service";

const router = Router();

router.post("/update", async (req, res) => {
  const userId = req.body.userId;
  const newScore = req.body.highestStreak;
  const userScore = await getPlayerScore(userId);
  console.log(
    `User ${userId} has score ${newScore} and highestStreak ${userScore.highestStreak}`
  );
  if (userScore.highestStreak! < newScore) {
    // cant be null due to implementaton of getPlayerScore
    const updatedScore = updatePlayerScore(userId, newScore);
    console.log("updatedScore", updatedScore);
  }

  res.send("Score updated");
});

router.get("/", async (req, res) => {
  const scores = await getScores();
  res.json(scores);
});

export default router;
