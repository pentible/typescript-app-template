import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTrpcContext } from "api";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "~/env";

async function handler(req: NextRequest) {
    return await fetchRequestHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        req,
        createContext: async ({ resHeaders }) => {
            return await createTrpcContext({
                req: { headers: req.headers },
                res: { headers: resHeaders },
                cookies: cookies(),
            });
        },
        onError:
            env.NODE_ENV === "development"
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
                          //   TODO: maybe print error instead of just message? unless it's already there...
                      );
                  }
                : undefined,
    });
}

export { handler as GET, handler as POST };
