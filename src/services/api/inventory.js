import { apiClient } from "./client";

export const inventoryApi = {
	listUsers: () => apiClient.get("/management/users"),
	updateTriggers: (id, payload) => apiClient.patch(`/inventory/triggers/${id}`, payload),
	updatePrice: (id, payload) => apiClient.patch(`/inventory/price/${id}`, payload),
	correctInventory: (payload) => apiClient.patch("/inventory/inventory-correction", payload),
	updateBeginningBalance: (id, payload) =>
		apiClient.patch(`/inventory/beginning-balance/${id}`, payload),
};
