/** @type {import('tailwindcss').Config} */
module.exports = {
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
};
