import type { AppRouter } from "@repo/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink, createTRPCClient } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import constants from "expo-constants";
import type { ReactNode } from "react";
import superjson from "superjson";
import { env } from "#src/env";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
export { useTRPC as useTrpc };

function getBaseUrl() {
    const localhost = constants.expoConfig?.hostUri?.split(":")[0];
    if (localhost == null) {
        return env.EXPO_PUBLIC_APP_URL;
    }

    return `http://${localhost}:${process.env.PORT ?? 3000}`;
}

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
            colorMode: "ansi",
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
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {children}
            </TRPCProvider>
        </QueryClientProvider>
    );
}
