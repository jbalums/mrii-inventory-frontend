import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import https from "https";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
	server: {
		https: {
			key: fs.readFileSync("server.key"),
			cert: fs.readFileSync("server.cert"),
		},
	},
});
