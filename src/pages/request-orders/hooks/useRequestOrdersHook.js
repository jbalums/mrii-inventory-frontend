import { requisitionsApi } from "@/src/services/api/requisitions";

const useRequestOrdersHook = () => {
	const saveRequestOrder = (data, items = []) =>
		requisitionsApi.create(data, items);

	const updateRequestOrder = (id, data, items = []) =>
		requisitionsApi.update(id, data, items);

	const getRequestOrderDetail = (id) => requisitionsApi.getById(id);

	const deleteRequestOrder = (id) => requisitionsApi.delete(id);

	const correctRequestOrder = (data) => requisitionsApi.correct(data);

	return {
		saveRequestOrder,
		getRequestOrderDetail,
		deleteRequestOrder,
		correctRequestOrder,
		updateRequestOrder,
	};
};

export default useRequestOrdersHook;
