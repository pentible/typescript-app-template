"use client";

import type { AppRouter } from "@repo/backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink, loggerLink, createTRPCClient } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { ReactNode } from "react";
import superjson from "superjson";
import { env } from "#src/env";
import { useConst } from "#src/utils/use-const";

// TODO: consider changing, idk
// eslint-disable-next-line @typescript-eslint/naming-convention
const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
export { useTRPC as useTrpc };

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

export function TrpcProvider({ children }: Props) {
    const queryClient = getQueryClient();

    const trpcClient = useConst(() => {
        return createTRPCClient<AppRouter>({
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
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {children}
            </TRPCProvider>
            {env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS_ENABLED ? (
                <ReactQueryDevtools />
            ) : null}
        </QueryClientProvider>
    );
}
