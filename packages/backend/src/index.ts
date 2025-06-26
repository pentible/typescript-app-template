import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "#src/routers/root.js";

export { prisma } from "#src/db/prisma.js";
export { appRouter, type AppRouter } from "#src/routers/root.js";
export { createTrpcContext } from "#src/trpc.js";

/**
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
