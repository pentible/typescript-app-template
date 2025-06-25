import { pentible, relativeIgnoreFile } from "@pentible/eslint-config";
import { pentibleExpo } from "@pentible/eslint-config-expo";
import { pentibleNext } from "@pentible/eslint-config-next";
import { pentibleNode } from "@pentible/eslint-config-node";
import { pentiblePrettier } from "@pentible/eslint-config-prettier";
import { pentibleReact } from "@pentible/eslint-config-react";
import { pentibleWeb } from "@pentible/eslint-config-web";
import reactQuery from "@tanstack/eslint-plugin-query";
import { defineConfig } from "eslint/config";

const config = defineConfig([
    relativeIgnoreFile(".gitignore", import.meta.url),
    {
        settings: {
            // NOTE: required because n plugin doesn't read the root package.json
            node: { version: "^22" },
        },
    },
    pentible,
    {
        files: ["apps/web/**", "apps/desktop/**"],
        extends: [
            pentibleNode,
            pentibleWeb,
            pentibleReact,
            reactQuery.configs["flat/recommended"],
            pentibleNext,
        ],
    },
    {
        files: ["apps/mobile/**"],
        extends: [
            pentibleReact,
            reactQuery.configs["flat/recommended"],
            pentibleExpo,
        ],
    },
    // TODO: remove & fix errors
    { rules: { "react-refresh/only-export-components": "off" } },
    {
        files: ["apps/db/**", "apps/api/**"],
        extends: [pentibleNode],
    },
    pentiblePrettier,
]);

export default config;
