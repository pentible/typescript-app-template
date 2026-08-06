/** @satisfies {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    reactCompiler: true,
    typedRoutes: true,
    experimental: {
        turbopackRustReactCompiler: true,
    },

    // linting is run separately in ci
    typescript: { ignoreBuildErrors: true },

    // export for tauri
    output: "export",
};

export default config;
