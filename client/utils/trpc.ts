import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../server/routers/_app"; // Import the types from your backend

export const trpc = createReactQueryHooks<AppRouter>();
