import { PrismaClient, Score, User } from "@prisma/client";
import express, { Router } from "express";
import {
  createUser,
  getUserByName,
  getUsers,
  getPlayerScore,
  updatePlayerScore,
  getScores,
} from "../services/db-service";
import { get } from "lodash";

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
  }

  res.send("Score updated");
});

router.get("/", async (_, res) => {
  const scores = await getScores();
  res.json(scores);
});

router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  const scores: Score[] = await getScores();
  const playerScore = scores.find((score) => score.userId === userId);
  if (!playerScore) {
    res.status(404).send("User not found");
  }
  res.json(playerScore);
});

export default router;
