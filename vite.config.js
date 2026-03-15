import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

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
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
	server: {
		historyApiFallback: true,
	},
	/* server: {
		https: {
			key: fs.readFileSync("server.key"),
			cert: fs.readFileSync("server.cert"),
		},
	}, */
});
