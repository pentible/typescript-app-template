"use client";

import type { AppRouter } from "@repo/backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink, createTRPCClient } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { ReactNode } from "react";
import superjson from "superjson";
import { env } from "#src/env";

// NOTE: renamed before exporting
// eslint-disable-next-line @typescript-eslint/naming-convention
const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

// NOTE: this file shouldn't change that much, so losing fast refresh is fine
// eslint-disable-next-line react-refresh/only-export-components
export { useTRPC as useTrpc };

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const trpcClient = createTRPCClient<AppRouter>({
    links: [
        loggerLink({
            enabled: (opts) =>
                process.env.NODE_ENV === "development" ||
                (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
            url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
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
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {children}
            </TRPCProvider>
        </QueryClientProvider>
    );
}
