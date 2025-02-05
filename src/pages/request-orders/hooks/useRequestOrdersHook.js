import axios from "@/libs/axios";
const useRequestOrdersHook = () => {
	const saveRequestOrder = (data, items = []) => {
		let formData = new FormData();

		formData.append("project_code", data?.project_code);
		formData.append("date_needed", data?.date_needed);
		formData.append("account_code", data?.account_code);
		formData.append("purpose", data?.purpose);
		if (items?.length > 0) {
			items.map((item) => {
				formData.append("inventory_id[]", item?.id);
				formData.append("quantity[]", item?.quantity);
			});
		}
		return axios.post("/inventory/requisition", formData);
	};

	const getRequestOrderDetail = (id) => {
		return axios.get(`/inventory/requisition/${id}`);
	};
	const deleteRequestOrder = (id) => {
		return axios.post(`/inventory/requisition/${id}`, {
			_method: "DELETE",
		});
	};
	return {
		saveRequestOrder,
		getRequestOrderDetail,
	};
};

export default useRequestOrdersHook;
