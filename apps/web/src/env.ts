import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const booleanSchema = z.enum(["true", "false"]).transform((v) => v === "true");

export const env = createEnv({
    // NOTE: shared should only be used for "default" env vars available everywhere
    shared: {
        NODE_ENV: z.enum(["development", "test", "production"]),
    },
    server: {
        APP_URL: z.string().url(),
        VERCEL_URL: z.string().optional(),
    },
    // NOTE: client is for public env vars, available on the client and the server
    client: {
        NEXT_PUBLIC_REACT_QUERY_DEVTOOLS_ENABLED:
            booleanSchema.default("false"),
    },
    // NOTE: client side env vars must be directly referenced from `process.env`
    // for the nextjs compiler to properly inline them
    experimental__runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_REACT_QUERY_DEVTOOLS_ENABLED:
            process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS_ENABLED,
    },
    emptyStringAsUndefined: true,
});
