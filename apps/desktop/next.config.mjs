/** @satisfies {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    transpilePackages: ["api", "db"],

    // linting is run separately in ci
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },

    // export for tauri
    output: "export",
};

export default config;
