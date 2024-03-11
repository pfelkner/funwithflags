import express from "express";
import { PrismaClient } from "@prisma/client";
import cors = require("cors");
import { Game } from "./game";
import countries from "../assets/with-difficulty.json";
const prisma = new PrismaClient();

let game = new Game(countries);

const app = express();
app.use(cors());
const port = 8080;
app.use(express.json());
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get("/user", async (req, res) => {
  console.log("get request at /");
  const users = await prisma.user.findMany();
  console.log("users:", users);
  res.json(users);
});

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const users = await prisma.user.findMany();
  if (users.find((user) => user.name === name)) {
    res.status(400).send("Name already exists");
    return;
  }
  const user = await prisma.user.create({
    data: {
      name,
      password,
    },
  });
  res.send(user.name);
});

app.post("/signin", async (req, res) => {
  const userName = req.body.name;
  const users = await prisma.user.findMany();
  const user = users.find((user) => user.name === userName);
  console.log("userName", userName);
  console.log("user", user);
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  if (user.password !== req.body.password) {
    res.status(400).send("Wrong password");
    return;
  }

  res.send(user);
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
