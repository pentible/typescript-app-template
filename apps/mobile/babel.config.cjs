"use strict";

/** @type {import("@babel/core").ConfigFunction} */
module.exports = function config(api) {
    api.cache.forever();

    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
    };
};
