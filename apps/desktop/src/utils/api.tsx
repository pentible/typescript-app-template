"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "api";
import type { ReactNode } from "react";
import superjson from "superjson";

export const api = createTRPCReact<AppRouter>();

function getBaseUrl() {
    // TODO: determine if local dev or not (likely just use an env var)
    // TODO: replace with prod app url
    // return "https://ptat.example.com";
    // throw new Error(
    //     "Failed to get localhost. Please point to your production server.",
    // );

    // dev ssr should use localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const trpcClient = api.createClient({
    transformer: superjson,
    links: [
        loggerLink({
            enabled: (opts) =>
                process.env.NODE_ENV === "development" ||
                (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
        }),
    ],
});

interface Props {
    children: ReactNode;
}

export function TrpcProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                <api.Provider client={trpcClient} queryClient={queryClient}>
                    {children}
                </api.Provider>
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    );
}
