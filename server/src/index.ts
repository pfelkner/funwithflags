require("dotenv").config();
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors = require("cors");
import { Game } from "./game";
import countries from "../assets/with-difficulty.json";
import authRouter from "../routers/auth";
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

let game = new Game(countries);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use(express.json());
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

app.get("/user", async (req, res) => {
  console.log("get request at /");
  const users = await prisma.user.findMany();
  console.log("users:", users);
  res.json(users);
});

app.post("/score/update", async (req, res) => {
  const userId = req.body.userId;
  const newScore = req.body.highestStreak;
  const userScore = await getPlayerScore(userId);
  console.log("update#".repeat(20));
  console.log(
    `User ${userId} has score ${newScore} and highestStreak ${userScore.highestStreak}`
  );
  console.log("update#".repeat(20));
  if (userScore.highestStreak! < newScore) {
    // cant be null due to implementaton of getPlayerScore
    const updatedScore = await prisma.score.update({
      where: { userId: userId },
      data: { highestStreak: newScore },
    });
  }

  res.send("Score updated");
});

app.get("/score", async (req, res) => {
  const scores = await prisma.score.findMany();
  res.json(scores);
});

const getPlayerScore = async (userId: number) => {
  const score = await prisma.score.findFirst({
    where: { userId: userId },
  });
  if (!score) {
    return await prisma.score.create({
      data: {
        userId: userId,
        highestStreak: 0,
      },
    });
  }
  return score;
};

app.get("/game/start", async (req, res) => {
  game.start();
  const data = game.test();
  res.json(data);
});

app.get("/gameover", async (req, res) => {
  game.stop();
  game = new Game(countries);
});
