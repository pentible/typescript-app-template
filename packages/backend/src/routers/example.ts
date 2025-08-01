import { z } from "zod";
import { createTrpcRouter, publicProcedure } from "#src/trpc.js";

export const exampleRouter = createTrpcRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => ({
            greeting: `Hello ${input.text}`,
        })),
    getAll: publicProcedure.query(
        async ({ ctx }) => await ctx.prisma.example.findMany(),
    ),
});
