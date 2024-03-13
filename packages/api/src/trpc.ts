/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { TRPCError, initTRPC } from "@trpc/server";
import { db } from "db";
import type { NextRequest } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

// eslint-disable-next-line import/no-unused-modules
export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export function createTrpcContext(req: NextRequest, resHeaders: Headers) {
    const session = getSession(req);

    return {
        db,
        session,
        req,
        res: { headers: resHeaders },
    };
}

const APP_TOKEN = "APP_TOKEN";
function getSession(req: NextRequest) {
    const token = req.cookies.get(APP_TOKEN);
    if (!token) {
        return null;
    }

    // TODO: instead of an empty object, fetch a user/session based on the token (depends on how you implement auth, but could be as simple as `SELECT * FROM sessions WHERE token = ?`)
    return {};
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

// eslint-disable-next-line import/no-unused-modules
export const authedProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return await next({
        ctx: {
            ...ctx,
            // infers that `session` is non-nullable to downstream resolvers
            session: { ...ctx.session },
        },
    });
});
