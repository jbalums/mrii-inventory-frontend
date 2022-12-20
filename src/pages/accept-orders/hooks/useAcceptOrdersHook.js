import axios from "@/libs/axios.js";

const useAcceptOrdersHook = () => {
	const getAcceptedOrderById = (id) => {
		return axios.get(`/inventory/request/${id}`)
	};
	return {
		getAcceptedOrderById,
	};
};

export default useAcceptOrdersHook;
