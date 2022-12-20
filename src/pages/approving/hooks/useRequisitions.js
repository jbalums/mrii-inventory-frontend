import axios from "@/libs/axios.js";

export  const useRequisitions = () => {
    const getRequisitions = () => {
        return axios.get("/inventory/requisition");
    };

    const getRequisitionById = (id) => {
        return axios.get(`/inventory/requisition/${id}`).then( res => res.data.data)
    }

    const approvedRequisition = (id) => {
        return axios.post(`/inventory/requisition-approved/${id}`)
    }

    return {
        getRequisitions,
        getRequisitionById,
        approvedRequisition
    }
}