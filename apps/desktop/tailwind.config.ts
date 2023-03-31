import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-quicksand)"],
                // mono: ["var(--font-inconsolata)"],
            },
        },
    },
    plugins: [],
} satisfies Config;
