"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "api";
import type { ReactNode } from "react";
import superjson from "superjson";
import { env } from "#src/env";
import { useConst } from "#src/utils/use-const";

export const api: ReturnType<typeof createTRPCReact<AppRouter>> =
    createTRPCReact<AppRouter>();

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return createQueryClient();
    }

    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
};

function getBaseUrl() {
    if (typeof window !== "undefined") {
        // browser should use relative url
        return "";
    }

    return env.APP_URL;
}

interface Props {
    children: ReactNode;
}

export function TrpcReactProvider({ children }: Props) {
    const queryClient = getQueryClient();

    const trpcClient = useConst(() => {
        return api.createClient({
            links: [
                loggerLink({
                    enabled: (opts) =>
                        env.NODE_ENV === "development" ||
                        (opts.direction === "down" &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    transformer: superjson,
                }),
            ],
        });
    });

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {children}
            </api.Provider>
            {env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS_ENABLED ? (
                <ReactQueryDevtools />
            ) : null}
        </QueryClientProvider>
    );
}
