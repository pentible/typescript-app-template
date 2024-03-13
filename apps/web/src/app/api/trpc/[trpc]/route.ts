import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTrpcContext } from "api";
import type { NextRequest } from "next/server";
import { env } from "~/env";

async function handler(req: NextRequest) {
    return await fetchRequestHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        req,
        createContext: ({ resHeaders }) => createTrpcContext(req, resHeaders),
        onError:
            env.NODE_ENV === "development"
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
                      );
                  }
                : undefined,
    });
}

export { handler as GET, handler as POST };
