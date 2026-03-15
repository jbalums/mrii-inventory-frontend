import { apiClient } from "./client";

export const authApi = {
	getCurrentUser: () => apiClient.get("/user"),
	getNotifications: () => apiClient.get("/inventory/notifications"),
	login: (credentials) => apiClient.post("/login", credentials),
	logout: () => apiClient.post("/logout"),
};
