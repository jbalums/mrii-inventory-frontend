import { requisitionsApi } from "@/src/services/api/requisitions";

export const useRequisitions = () => {
	const getRequisitions = () => {
		return requisitionsApi.list();
	};

	const getRequisitionById = (id) => {
		return requisitionsApi.getById(id).then((data) => data.data);
	};

	const approvedRequisition = (id) => {
		return requisitionsApi.approve(id);
	};

	const declineRequisition = (id) => {
		return requisitionsApi.decline(id);
	};

	const deleteRequisition = (id) => {
		return requisitionsApi.deleteApproved(id);
	};

	return {
		getRequisitions,
		getRequisitionById,
		approvedRequisition,
		declineRequisition,
		deleteRequisition,
	};
};
