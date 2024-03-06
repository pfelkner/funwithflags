// import express from "express";
// import * as trpcExpress from "@trpc/server/adapters/express";
// import { appRouter } from "./routers/_app";

// const app = express();

// app.use(
//   "/trpc",
//   trpcExpress.createExpressMiddleware({
//     router: appRouter,
//     createContext: () => ({}), // Create context for each request
//   }),
// );

// app.listen(4000);
// console.log("Server listening on http://localhost:4000");

// import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
// import { appRouter } from "./routers/_app";
import { Prisma, PrismaClient } from "@prisma/client";
import * as cors from "cors";
const prisma = new PrismaClient();

// // created for each request
// const createContext = ({
//   req,
//   res,
// }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
// type Context = Awaited<ReturnType<typeof createContext>>;

// const t = initTRPC.context<Context>().create();
// const router = appRouter;

const app = express();
app.use(cors.default);
app.listen(4000, () => {
  console.log(`[server]: Server is running at http://localhost:${4000}`);
});
// app.use(express.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  console.log("users:", users);
  res.json(users);
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const user = await prisma.user.create({
    data: {
      name: "Alice",
    },
  });
  // const users = await prisma.user.findMany();
  // console.log("users:", users);
  res.json(user);
});

// app.use(
//   "/trpc",
//   trpcExpress.createExpressMiddleware({
//     router: appRouter,
//     createContext,
//   })
// );
