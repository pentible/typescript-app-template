import "~/styles/globals.css";
import { Quicksand } from "next/font/google";
import type { ReactNode } from "react";
import { TrpcProvider } from "~/utils/api";

const quicksand = Quicksand({
    subsets: ["latin"],
    variable: "--font-quicksand",
});

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <html className="overscroll-none" lang="en">
            <body
                className={`${quicksand.variable} bg-indigo-900 font-sans text-indigo-50`}
            >
                <TrpcProvider>{children}</TrpcProvider>
            </body>
        </html>
    );
}
