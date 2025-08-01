/** @satisfies {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    experimental: {
        reactCompiler: true,
    },

    // linting is run separately in ci
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
};

export default config;
