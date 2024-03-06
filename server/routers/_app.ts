import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string().nullish() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.name ?? "world"}`,
      };
    }),
  // Define more procedures (endpoints) here...
});

export type AppRouter = typeof appRouter;
export default appRouter;
