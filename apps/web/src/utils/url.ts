import { env } from "~/env";

export const APP_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`;

const TAURI_APP_URL =
    env.NODE_ENV === "production"
        ? "tauri://localhost"
        : "http://localhost:3001";

export const ALLOWED_ORIGINS = [APP_URL, TAURI_APP_URL];
