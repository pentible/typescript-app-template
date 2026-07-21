import type { NextConfig } from "next";

const config = {
    reactStrictMode: true,
    reactCompiler: true,

    // linting is run separately in ci
    typescript: { ignoreBuildErrors: true },
} satisfies NextConfig;

export default config;
