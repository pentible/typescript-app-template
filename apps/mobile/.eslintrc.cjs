"use strict";

/** @satisfies {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        "@pentible/eslint-config-react",
        "@pentible/eslint-config-expo",
        "@pentible/eslint-config-prettier",
    ],
    settings: {
        "import/resolver": {
            typescript: {
                // NOTE: required due to bug: https://github.com/import-js/eslint-import-resolver-typescript/issues/148
                project: __dirname,
            },
        },
    },
};
