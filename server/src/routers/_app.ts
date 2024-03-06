import { z } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";
import { router, publicProcedure } from "../trpc";

const prisma = new PrismaClient();

export const appRouter = router({
  getUser: publicProcedure.input(z.string()).query((opts) => {
    opts.input; // string
    return { id: opts.input, name: "Bilbo" };
  }),
  createUser: publicProcedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of choice
      return await prisma.user.create({
        data: { name: opts.input.name },
      }); // or whatever
      // return await UserModel.create({
      //   data: opts.input,
      // });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
