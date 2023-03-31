import "~/styles/globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import type { ReactNode } from "react";
import { TrpcProvider } from "~/utils/api";

const quicksand = Quicksand({
    subsets: ["latin"],
    variable: "--font-quicksand",
});

export const metadata: Metadata = {
    title: "ptat",
    description: "bootstrapped with pentible/typescript-app-template",
};

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <html lang="en">
            <body
                className={`${quicksand.variable} font-sans text-indigo-50 bg-indigo-900`}
            >
                <TrpcProvider>{children}</TrpcProvider>
            </body>
        </html>
    );
}
