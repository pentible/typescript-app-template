"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "api";
import type { ReactNode } from "react";
import superjson from "superjson";
import { APP_URL } from "~/utils/url";

export const api = createTRPCReact<AppRouter>();

function getBaseUrl() {
    if (typeof window !== "undefined") {
        // browser should use relative url
        return "";
    }

    return APP_URL;
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
