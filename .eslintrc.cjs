"use strict";

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: ["@pentible/eslint-config", "@pentible/eslint-config-prettier"],
    rules: {
        // TODO: update deps & remove
        "arrow-body-style": "off",
    },
};
