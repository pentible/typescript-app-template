import "server-only";

import { createTRPCClient, loggerLink, TRPCClientError } from "@trpc/client";
import { callProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import type { TRPCErrorResponse } from "@trpc/server/rpc";
import type { AppRouter } from "api";
import { appRouter, createTrpcContext } from "api";
import { cookies, headers as getHeaders } from "next/headers";
import { cache } from "react";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
    const headers = getHeaders();

    return await createTrpcContext({
        req: { headers },
        // NOTE: RSCs cannot set headers, only server actions (and routes, but
        // they set their own request context)
        res: { headers },
        cookies: cookies(),
    });
});

// eslint-disable-next-line import/no-unused-modules
export const api = createTRPCClient<AppRouter>({
    links: [
        loggerLink({
            enabled: (op) =>
                process.env.NODE_ENV === "development" ||
                (op.direction === "down" && op.result instanceof Error),
        }),
        /**
         * Custom RSC link that lets us invoke procedures without using http requests. Since Server
         * Components always run on the server, we can just call the procedure as a function.
         */
        () =>
            ({ op }) =>
                observable((observer) => {
                    createContext()
                        .then(async (ctx) => {
                            return await callProcedure({
                                procedures: appRouter._def.procedures,
                                path: op.path,
                                // eslint-disable-next-line @typescript-eslint/require-await
                                getRawInput: async () => op.input,
                                ctx,
                                type: op.type,
                            });
                        })
                        .then((data) => {
                            observer.next({ result: { data } });
                            observer.complete();
                        })
                        .catch((cause: TRPCErrorResponse) => {
                            observer.error(TRPCClientError.from(cause));
                        });
                }),
    ],
});
