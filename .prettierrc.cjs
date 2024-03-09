"use strict";

const pentible = require("@pentible/prettier");

/** @type {import('prettier').Config} */
module.exports = {
    ...pentible,
    plugins: [...pentible.plugins, "prettier-plugin-tailwindcss"],
};
