/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { TRPCError, initTRPC } from "@trpc/server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "#src/db/prisma.js";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

// eslint-disable-next-line import-x/no-unused-modules
export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;

interface CreateTrpcContextInput {
    req: { headers: Headers };
    res: { headers: Headers };
    cookies: ReadonlyRequestCookies;
}

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/server/context
 */
export async function createTrpcContext({
    req,
    res,
    cookies,
}: CreateTrpcContextInput) {
    const session = await getSession(cookies);

    return {
        prisma,
        session,
        req,
        res,
        cookies,
    };
}

const appToken = "APP_TOKEN";
async function getSession(cookies: ReadonlyRequestCookies) {
    const token = cookies.get(appToken);
    if (!token) {
        return null;
    }

    // TODO: instead of an empty object, fetch a user/session based on the token (depends on how you implement auth, but could be as simple as `SELECT * FROM sessions WHERE token = ?`)
    return await Promise.resolve({});
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get type safety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTrpcContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTrpcRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
// eslint-disable-next-line import-x/no-unused-modules
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return await next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session },
        },
    });
});
