// const User = require("./db.js");

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const { sequelize, testConnection } = require("./db.js");

// app.use(cors());
// app.use(express.json());

// app.listen(8081, () => {
//   console.log("Server is running on port 8081");
//   // testConnection;
// });

// sequelize.sync().then(() => {
//   app.get("/", async (req, res) => {
//     const users = await User.findAll();
//     res.send(users);
//   });

//   app.post("/", async (req, res) => {
//     const user = User.findOne({ where: { username: req.body.email } }).then(
//       async (user) => {
//         if (user) {
//           throw new Error("User already exists");
//         } else {
//           const newUser = await User.create({
//             username: req.body.email,
//             password: req.body.password,
//           });
//           return newUser;
//         }
//       },
//     );

//     res.send(user);
//   });
// });
//
import express, { Express, Request, Response } from "express";
// import * as trpcExpress from "@trpc/server/adapters/express";
// import appRouter from "./routers/_app";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// app.use(
//   "/trpc",
//   trpcExpress.createExpressMiddleware({
//     router: appRouter,
//     createContext: () => null, // Create context for each request
//   }),
// );

app.listen(4000);
console.log("Server listening on http://localhost:4000");
