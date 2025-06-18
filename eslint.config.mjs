import {
    pentibleEslintConfig,
    relativeIgnoreFile,
} from "@pentible/eslint-config";
import { pentibleEslintConfigExpo } from "@pentible/eslint-config-expo";
import { pentibleEslintConfigNext } from "@pentible/eslint-config-next";
import { pentibleEslintConfigNode } from "@pentible/eslint-config-node";
import { pentibleEslintConfigPrettier } from "@pentible/eslint-config-prettier";
import { pentibleEslintConfigReact } from "@pentible/eslint-config-react";
import { pentibleEslintConfigWeb } from "@pentible/eslint-config-web";
import { defineConfig } from "eslint/config";

const config = defineConfig([
    relativeIgnoreFile(".gitignore", import.meta.url),
    pentibleEslintConfig,
    pentibleEslintConfigPrettier,
    {
        files: ["apps/web/**", "apps/desktop/**"],
        extends: [
            pentibleEslintConfigNode,
            pentibleEslintConfigWeb,
            pentibleEslintConfigReact,
            pentibleEslintConfigNext,
            pentibleEslintConfigPrettier,
        ],
    },
    {
        files: ["apps/mobile/**"],
        extends: [
            pentibleEslintConfigReact,
            pentibleEslintConfigExpo,
            pentibleEslintConfigPrettier,
        ],
    },
    {
        files: ["apps/db/**", "apps/api/**"],
        extends: [pentibleEslintConfigNode, pentibleEslintConfigPrettier],
    },
]);

export default config;
