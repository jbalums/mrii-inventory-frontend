import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import axios from "@/libs/axios";
import { getStorage } from "@/libs/storage";
import { toast, ToastContainer } from "react-toastify";
axios.interceptors.request.use(
	async function (config) {
		const token = await getStorage("token");

		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
const removeSession = () => {
	if (!window.location.pathname.includes("login")) {
		setTimeout(() => {
			toast.error(
				"Session expired! Login to your credentails to continue."
			);
		}, 500);
		window.localStorage.clear();
		window.location.reload();
	}
};
axios.interceptors.response.use(
	(response) => {
		if (response.status === 500) {
			toast.error("Unable to connect to server!");
			return Promise.reject({ response });
		}

		return response;
	},
	(error) => {
		if (error.response) {
			const code = error.response.status;

			switch (parseInt(code)) {
				case 401:
				case 403:
					removeSession();
					break;

				case 500:
					toast.error("Internal server error");
					break;
			}

			if (error.response && error.response.data) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error.message);
	}
);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ToastContainer position="bottom-right" autoClose={3000} />
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();
