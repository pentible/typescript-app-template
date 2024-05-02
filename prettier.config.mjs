import pentible from "@pentible/prettier";

/** @satisfies {import("prettier").Config} */
const config = {
    ...pentible,
    plugins: [...pentible.plugins, "prettier-plugin-tailwindcss"],
};

export default config;
