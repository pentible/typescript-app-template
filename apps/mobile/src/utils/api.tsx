import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "api";
import constants from "expo-constants";
import type { ReactNode } from "react";
import superjson from "superjson";

export const api: ReturnType<typeof createTRPCReact<AppRouter>> =
    createTRPCReact<AppRouter>();

function getBaseUrl() {
    // TODO: should use env.APP_URL
    const localhost = constants.expoConfig?.hostUri?.split(":")[0];
    if (localhost == null) {
        // TODO: replace with prod app url
        // return "https://ptat.example.com";
        throw new Error(
            "Failed to get localhost. Please point to your production server.",
        );
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
const trpcClient = api.createClient({
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
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {children}
            </api.Provider>
        </QueryClientProvider>
    );
}
