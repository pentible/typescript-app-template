import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// NOTE: non-default env vars need the `NEXT_PUBLIC_` prefix to be shared
type SharedEnv = Record<"NODE_ENV" | `NEXT_PUBLIC_${string}`, unknown>;

export const env = createEnv({
    shared: {
        NODE_ENV: z.enum(["development", "test", "production"]),
    } satisfies SharedEnv,
    server: {
        APP_URL: z.string().url(),
        VERCEL_URL: z.string().optional(),
    },
    client: {
        // NEXT_PUBLIC_CLIENT_VAR: z.string().min(1),
    },
    // NOTE: client side env vars must be directly referenced from `process.env`
    // for the nextjs compiler to properly inline them
    experimental__runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        // NEXT_PUBLIC_CLIENT_VAR: process.env.NEXT_PUBLIC_CLIENT_VAR,
    },
    emptyStringAsUndefined: true,
});
