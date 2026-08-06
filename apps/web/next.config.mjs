/** @satisfies {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    reactCompiler: true,
    typedRoutes: true,
    cacheComponents: true,
    partialPrefetching: true,
    experimental: {
        turbopackRustReactCompiler: true,
    },

    // linting is run separately in ci
    typescript: { ignoreBuildErrors: true },
};

export default config;
