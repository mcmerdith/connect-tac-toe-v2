import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return [];
  }),
});
