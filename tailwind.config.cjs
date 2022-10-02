/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#d5d8e5",
                    DEFAULT: "#1B2254",
                    dark: "#1B2254",
                },
                secondary: {
                    light: "#8286F0",
                    DEFAULT: "#8286F0",
                    dark: "#8286F0",
                },
                tertiary: {
                    light: "#E8D5B5",
                    DEFAULT: "#E8D5B5",
                    dark: "#E8D5B5",
                },
                accent: {
                    light: "#00B9B8",
                    DEFAULT: "#00B9B8",
                    dark: "#00B9B8",
                },
                background: {
                    light: "#F5F7FF",
                    DEFAULT: "#F5F7FF",
                    dark: "#F5F7FF",
                },
                foreground: {
                    light: "#EBECF6",
                    DEFAULT: "#EBECF6",
                    dark: "#EBECF6",
                },
                border: {
                    light: "#DDDEE6",
                    DEFAULT: "#DDDEE6",
                    dark: "#DDDEE6",
                },
                warning: {
                    light: "#FF8800",
                    DEFAULT: "#FF8800",
                    dark: "#FF8800",
                },
                info: {
                    light: "#0099CC",
                    DEFAULT: "#0099CC",
                    dark: "#0099CC",
                },
                danger: {
                    light: "#CC0000",
                    DEFAULT: "#CC0000",
                    dark: "#CC0000",
                },
                success: {
                    light: "#007E33",
                    DEFAULT: "#007E33",
                    dark: "#007E33",
                },
                dark: {
                    light: "#45485A",
                    DEFAULT: "#45485A",
                    dark: "#45485A",
                },
                darker: {
                    light: "#292B39",
                    DEFAULT: "#292B39",
                    dark: "#292B39",
                },
                light: {
                    light: "#F7F7F7",
                    DEFAULT: "#F7F7F7",
                    dark: "#F7F7F7",
                },
                placeholder: {
                    light: "#A8ABBB",
                    DEFAULT: "#A8ABBB",
                    dark: "#A8ABBB",
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "base", // only generate global styles
            strategy: "class", // only generate classes
        }),
    ],
};
