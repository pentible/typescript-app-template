"use strict";

/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        "@pentible/eslint-config-node",
        "@pentible/eslint-config-prettier",
    ],
    overrides: [
        {
            files: ["src/seed.ts"],
            rules: {
                "import/no-unused-modules": "off",
            },
        },
    ],
};
