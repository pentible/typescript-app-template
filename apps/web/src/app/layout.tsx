import "#/styles/globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "#/providers";

const quicksand = Quicksand({
    subsets: ["latin"],
    variable: "--font-quicksand",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Ptat",
    description: "bootstrapped with pentible/typescript-app-template",
};

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <Providers>
            <html lang="en">
                <body
                    className={`${quicksand.variable} bg-indigo-900 font-sans text-indigo-50`}
                >
                    {children}
                </body>
            </html>
        </Providers>
    );
}
