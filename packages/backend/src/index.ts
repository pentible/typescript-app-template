import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "#src/root.js";

export { appRouter, type AppRouter } from "#src/root.js";
export { createTrpcContext } from "#src/trpc.js";
export { prisma } from "#src/db.js";

/**
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
