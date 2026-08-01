import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "#src/routers/root";

export { prisma } from "#src/db/prisma";
export { appRouter, type AppRouter } from "#src/routers/root";
export { createTrpcContext } from "#src/trpc";

/**
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
