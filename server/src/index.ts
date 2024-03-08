import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors = require("cors");
const prisma = new PrismaClient();

const app = express();
app.use(cors());
const port = 8080;
app.use(express.json());
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get("/", async (req, res) => {
  console.log("get request at /");
  const users = await prisma.user.findMany();
  console.log("users:", users);
  res.json(users);
});

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const users = await prisma.user.findMany();
  if (!name) {
    res.status(400).send("Name is required");
    return;
  }
  if (users.find((user) => user.name === name)) {
    res.status(400).send("Name already exists");
    return;
  }
  const user = await prisma.user.create({
    data: {
      name: name,
    },
  });
  res.send(user);
});

app.post("/sigin", async (req, res) => {
  const userName = req.body.name;
  const users = await prisma.user.findMany();
  const user = users.find((user) => user.name === userName);
  console.log("userName", userName);
  console.log("user", user);
  if (!user) {
    res.status(400).send("User not found");
    return;
  }

  res.send(user);
});
