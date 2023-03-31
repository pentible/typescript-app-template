import { example } from "db";
import { z } from "zod";
import { createTrpcRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTrpcRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => ({
            greeting: `Hello ${input.text}`,
        })),
    getAll: publicProcedure.query(
        async ({ ctx }) => await ctx.db.select().from(example),
    ),
});
