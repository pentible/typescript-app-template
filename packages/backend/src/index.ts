import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "#backend/routers/root";

export { prisma, PrismaClient } from "#backend/db/prisma";
export { appRouter, type AppRouter } from "#backend/routers/root";
export { createTrpcContext } from "#backend/trpc";

/**
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
