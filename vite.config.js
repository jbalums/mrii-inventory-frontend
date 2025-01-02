import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import https from "https";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		chunkSizeWarningLimit: 100,
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
					return;
				}
				warn(warning);
			},
			output: {
			  manualChunks: undefined // Ensure single bundle for SPAs
			}
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
	server: {
	  historyApiFallback: true // Handles SPA fallback for local development
	}
	/* server: {
		https: {
			key: fs.readFileSync("server.key"),
			cert: fs.readFileSync("server.cert"),
		},
	}, */
});
