"use strict";

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);
const config = withNativeWind(defaultConfig, {
    input: "./src/styles/globals.css",
    configPath: "./tailwind.config.cjs",
});

module.exports = config;
