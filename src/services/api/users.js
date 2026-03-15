import { apiClient } from "./client";

const multipartConfig = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
};

export const usersApi = {
	create: (formData) =>
		apiClient.post("/management/users", formData, multipartConfig),
	update: (id, formData) =>
		apiClient.patch(`/management/users/${id}`, formData, multipartConfig),
	delete: (id) => apiClient.delete(`/management/users/${id}`),
};
