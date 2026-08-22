/** @satisfies {import("lint-staged").Configuration} */
const config = {
    "*": ["prettier --check --ignore-unknown", "shellcheck-all --color=always"],
    "*.{js,ts,mjs,cjs,jsx,tsx}": ["eslint"],
    // NOTE: using the function syntax so files aren't passed to the command
    "**/*.{mjs,ts}": () => "tsc --noEmit",
    "package-lock.json": () => "check-package-lock",
    "packages/backend/prisma/schema.prisma": () =>
        "npx -w @repo/backend prisma generate --no-hints",
};

export default config;
