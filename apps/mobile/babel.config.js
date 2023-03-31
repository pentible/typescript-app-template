const path = require("path");
const loadConfig = require("tailwindcss/loadConfig");

/** @type {import("@babel/core").ConfigFunction} */
module.exports = function config(api) {
    api.cache.forever();

    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "nativewind/babel",
                {
                    // TODO: (hopefully) temp fix for nativewind to load
                    // tailwind.config.ts
                    tailwindConfig: loadConfig(
                        path.join(__dirname, "tailwind.config.ts"),
                    ),
                },
            ],
            "expo-router/babel",
        ],
    };
};
