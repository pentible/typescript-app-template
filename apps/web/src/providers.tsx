"use client";

import type { ReactNode } from "react";
import { TrpcProvider } from "#/trpc/react";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return <TrpcProvider>{children}</TrpcProvider>;
}
