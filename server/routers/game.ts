import { GameService as gs } from "./../services/game";
import { Score } from "@prisma/client";
import { Router } from "express";
import {
  getPlayerScore,
  updatePlayerScore,
  getScores,
} from "../services/db-service";
import { Game } from "../src/game";
import countries from "../assets/with-difficulty.json";

const router = Router();

router.get("/start", async (req, res) => {
  // const game = new Game(countries);
  const game = gs.startGame();
  const data = game.test();
  res.json(data);
});

// router.get("/game/start", async (req, res) => {
//   game.start();
//   const data = game.test();
//   res.json(data);
// });

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

// app.get("/gameover", async (req, res) => {
//   game.stop();
//   game = new Game(countries);
// });
