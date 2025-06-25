import { exampleRouter } from "#src/routers/example.js";
import { createTrpcRouter } from "#src/trpc.js";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTrpcRouter({
    example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
