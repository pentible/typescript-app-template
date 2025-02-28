import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "#src/env";

const tauriAppUrl =
    env.NODE_ENV === "production"
        ? "tauri://localhost"
        : "http://localhost:3001";

const allowedOrigins = [
    env.APP_URL,
    env.VERCEL_URL != null ? `https://${env.VERCEL_URL}` : undefined,
    tauriAppUrl,
].filter((o) => o !== undefined);

export const config = {
    matcher: "/api/:path*",
};

export function middleware(request: NextRequest) {
    const origin = request.headers.get("origin") ?? env.APP_URL;
    const originAllowed = allowedOrigins.includes(origin);
    // TODO: review headers (current is based on trpc docs: https://trpc.io/docs/server/adapters/nextjs#handling-cors-and-other-advanced-usage)
    const headers = {
        "Access-Control-Allow-Origin": originAllowed ? origin : env.APP_URL,
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Access-Control-Allow-Headers": "content-type",
        "Referrer-Policy": "no-referrer",
        "Access-Control-Allow-Credentials": "true",
    };

    if (!originAllowed) {
        return NextResponse.json(
            { message: "invalid origin" },
            {
                status: 403,
                headers,
            },
        );
    }

    return NextResponse.next({ headers });
}
