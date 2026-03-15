import { apiClient } from "./client";

export const receivingApi = {
	create: (payload) => apiClient.post("/inventory/receiving", payload),
};
