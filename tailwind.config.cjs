/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					light: "#1B2254",
					DEFAULT: "#1B2254",
					dark: "#161B45",
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
				textPrimary: {
					light: "#45485A",
					DEFAULT: "#45485A",
					dark: "#45485A",
				},
				textSecondary: {
					light: "#292B39",
					DEFAULT: "#292B39",
					dark: "#292B39",
				},
				textLight: {
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
