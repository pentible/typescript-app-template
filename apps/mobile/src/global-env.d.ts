// TODO: remove? (surely nativewind has added this in recent versions)
declare module "*.css";

// TODO: ugh... https://github.com/expo/expo/issues/34104
declare namespace NodeJS {
    type ProcessEnv = Record<string, string>;
}
