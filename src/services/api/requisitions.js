import { apiClient } from "./client";

const buildRequestOrderFormData = (data, items = []) => {
	const formData = new FormData();

	formData.append("project_code", data?.project_code || "");
	formData.append("date_needed", data?.date_needed || "");
	formData.append("account_code", data?.account_code || "");
	formData.append("purpose", data?.purpose || "");

	items.forEach((item) => {
		formData.append("inventory_id[]", item?.id);
		formData.append("quantity[]", item?.qty);
	});

	return formData;
};

export const requisitionsApi = {
	list: () => apiClient.get("/inventory/requisition"),
	create: (data, items) =>
		apiClient.post("/inventory/requisition", buildRequestOrderFormData(data, items)),
	update: (id, data, items) =>
		apiClient.patch(
			`/inventory/requisition/${id}`,
			buildRequestOrderFormData(data, items),
		),
	getById: (id) => apiClient.get(`/inventory/requisition/${id}`),
	delete: (id) => apiClient.delete(`/inventory/requisition/${id}`),
	correct: (payload) =>
		apiClient.post("/inventory/AUzNo13OhD1ONaRO/correction", payload),
	approve: (id) => apiClient.post(`/inventory/requisition-approved/${id}`),
	decline: (id) => apiClient.post(`/inventory/requisition-decline/${id}`),
	deleteApproved: (id) => apiClient.post(`/inventory/requisition-delete/${id}`),
	accept: (id) => apiClient.post(`/inventory/requisition-accept/${id}`),
	approveIssuance: (id) => apiClient.post(`/inventory/approve-issuance/${id}`),
};
