import axios from "@/libs/axios";
import { getStorage } from "@/libs/storage";
import { normalizeApiError } from "./errors";

let isConfigured = false;
let unauthorizedHandler = null;

const unwrapResponse = (response) => response.data;

export const configureApiClient = ({ onUnauthorized } = {}) => {
	if (onUnauthorized) {
		unauthorizedHandler = onUnauthorized;
	}

	if (isConfigured) {
		return;
	}

	axios.interceptors.request.use(
		async (config) => {
			const token = await getStorage("token");

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		},
		(error) => Promise.reject(normalizeApiError(error)),
	);

	axios.interceptors.response.use(
		(response) => response,
		(error) => {
			const normalizedError = normalizeApiError(error);

			if (
				(normalizedError.status === 401 ||
					normalizedError.status === 403) &&
				typeof unauthorizedHandler === "function"
			) {
				unauthorizedHandler(normalizedError);
			}

			return Promise.reject(normalizedError);
		},
	);

	isConfigured = true;
};

export const apiClient = {
	get: (url, config) => axios.get(url, config).then(unwrapResponse),
	post: (url, data, config) => axios.post(url, data, config).then(unwrapResponse),
	patch: (url, data, config) =>
		axios.patch(url, data, config).then(unwrapResponse),
	delete: (url, config) => axios.delete(url, config).then(unwrapResponse),
	raw: axios,
};
