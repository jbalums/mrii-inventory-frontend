import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { SWRConfig } from "swr";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { configureApiClient } from "@/src/services/api/client";
import { toast, ToastContainer } from "react-toastify";

if (window?.console) {
	if (!String(import.meta.env.VITE_BACKEND_URL || "").includes(".test"))
		window.console.log = (log) => {};
}

const removeSession = () => {
	if (!window.location.pathname.includes("login")) {
		setTimeout(() => {
			toast.error("You have been logout!");
		}, 500);
		window.localStorage.clear();
		window.location.pathname = "/login";
	}
};

configureApiClient({
	onUnauthorized: removeSession,
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<SWRConfig value={{ fetcher }}>
			<BrowserRouter>
				<ToastContainer position="bottom-right" autoClose={3000} />
				<App />
			</BrowserRouter>
		</SWRConfig>
	</React.StrictMode>,
);

reportWebVitals();
