const pentible = require("@pentible/prettier");

module.exports = {
    ...pentible,
    plugins: [...pentible.plugins, "prettier-plugin-tailwindcss"],
};
