"use strict";

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Create the default Metro config
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
    input: "./src/styles/globals.css",
    configPath: "./tailwind.config.cjs",
});
