/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        "@pentible/eslint-config-node",
        "@pentible/eslint-config-web",
        "@pentible/eslint-config-react",
        "@pentible/eslint-config-next",
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
    rules: {
        // TODO: fix
        "compat/compat": "off",
        // TODO: drop
        "import/no-unassigned-import": [
            "error",
            {
                allow: [
                    "**/*.css",
                    "**/*.scss",
                    "@fontsource/**",
                    "expo-router/entry",
                    "server-only",
                ],
            },
        ],
    },
};
