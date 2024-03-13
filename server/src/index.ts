require("dotenv").config();
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors = require("cors");
import { Game } from "./game";
import countries from "../assets/with-difficulty.json";
import authRouter from "../routers/auth";
import scoreRouter from "../routers/score";
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

let game = new Game(countries);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/score", scoreRouter);
app.use(express.json());
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

app.get("/game/start", async (req, res) => {
  game.start();
  const data = game.test();
  res.json(data);
});

app.get("/gameover", async (req, res) => {
  game.stop();
  game = new Game(countries);
});
