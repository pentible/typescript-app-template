/** @satisfies {import("prettier").Config} */
const config = {
    proseWrap: "always",
    plugins: ["prettier-plugin-packagejson", "prettier-plugin-tailwindcss"],
};

export default config;
