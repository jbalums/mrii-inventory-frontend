/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					light: "#1C2255",
					DEFAULT: "#1C2255",
					dark: "#1C2255",
				},
				secondary: {
					light: "#7A31D4",
					DEFAULT: "#4D1F87",
					dark: "#291047",
				},
				tertiary: {
					light: "#9E88BA",
					DEFAULT: "#9E88BA",
					dark: "#9E88BA",
				},
				warning: {
					light: "#FACD16",
					DEFAULT: "#FA9F16",
					dark: "#F07A16",
				},
				info: {
					light: "#5684F0",
					DEFAULT: "#5684F0",
					dark: "#5684F0",
				},
				danger: {
					light: "#E37159",
					DEFAULT: "#E37159",
					dark: "#E37159",
				},
				success: {
					light: "#60CF21",
					DEFAULT: "#60CF21",
					dark: "#60CF21",
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
