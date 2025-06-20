import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "EXPO_PUBLIC_",
    // NOTE: client is for public env vars, available on the client and the server
    client: {
        EXPO_PUBLIC_APP_URL: z.string().url(),
    },
    // NOTE: env vars must be directly referenced from `process.env.*` for the
    // expo compiler to properly inline them.
    // SEE: https://docs.expo.dev/guides/environment-variables/
    runtimeEnvStrict: {
        EXPO_PUBLIC_APP_URL: process.env.EXPO_PUBLIC_APP_URL,
    },
    emptyStringAsUndefined: true,
});
