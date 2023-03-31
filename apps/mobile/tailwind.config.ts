import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                // NOTE: react-native doesn't properly support font weights for
                // custom fonts, so we need to use different families for each
                // weight
                "sans-light": ["Quicksand_300Light"],
                sans: ["Quicksand_400Regular"],
                "sans-medium": ["Quicksand_500Medium"],
                "sans-semibold": ["Quicksand_600SemiBold"],
                "sans-bold": ["Quicksand_700Bold"],
                // mono: "Inconsolata",
            },
        },
    },
    plugins: [],
} satisfies Config;
