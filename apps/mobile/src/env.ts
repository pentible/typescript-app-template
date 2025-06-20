import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "EXPO_PUBLIC_",
    // NOTE: shared should only be used for "default" env vars available everywhere
    // NOTE: client is for public env vars, available on the client and the server
    client: {
        EXPO_PUBLIC_APP_URL: z.string().url(),
    },
    // NOTE: client side env vars must be directly referenced from `process.env`
    // for the nextjs compiler to properly inline them
    runtimeEnvStrict: {
        EXPO_PUBLIC_APP_URL: process.env.EXPO_PUBLIC_APP_URL,
    },
    emptyStringAsUndefined: true,
});
