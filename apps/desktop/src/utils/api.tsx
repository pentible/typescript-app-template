"use client";

import type { AppRouter } from "@repo/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { ReactNode } from "react";
import superjson from "superjson";
import { env } from "#src/env";

export const api: ReturnType<typeof createTRPCReact<AppRouter>> =
    createTRPCReact<AppRouter>();

function getBaseUrl() {
    // TODO: determine if local dev or not (likely just use an env var)
    // dev ssr should use localhost
    // return `http://localhost:${process.env.PORT ?? 3000}`;

    if (typeof window !== "undefined") {
        // browser should use relative url
        return "";
    }

    return env.APP_URL;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const trpcClient = api.createClient({
    links: [
        loggerLink({
            enabled: (opts) =>
                process.env.NODE_ENV === "development" ||
                (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            transformer: superjson,
        }),
    ],
});

interface Props {
    children: ReactNode;
}

export function TrpcProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {children}
            </api.Provider>
        </QueryClientProvider>
    );
}
