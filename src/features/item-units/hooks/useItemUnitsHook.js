import axios from "@/libs/axios";
import { toast } from "react-toastify";
export const useItemUnits = () => {
	/* 
         FIELDS
            name
        */
	const getCategories = () => {
		return axios.get(`/management/units`);
	};
	const getItemUnits = () => {
		return axios.get(`/management/units`);
	};

	const saveItemUnits = async ({
		setErrors,
		setLoading,
		callback,
		...props
	}) => {
		if (props?.id) {
			axios
				.post(`/management/units/${props?.id}`, {
					...props,
					_method: "PATCH",
				})
				.then((res) => {
					toast.success("Item unit details updated successfully!");
					callback ? callback(res.data.data) : "";
				})
				.catch((error) => {
					toast.error(
						`Failed to submit the form. Please check your inputs!`,
					);
					if (error.response.status !== 422) throw error;
					setErrors(error.response.data.errors);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			axios
				.post("/management/units", { ...props })
				.then((res) => {
					toast.success("Item unit added successfully!");
					callback ? callback(res.data.data) : "";
				})
				.catch((error) => {
					toast.error(
						`Failed to submit the form. Please check your inputs!`,
					);
					if (error.response.status !== 422) throw error;
					setErrors(error.response.data.errors);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const deleteItemUnits = (id) => {
		return axios.post(`/management/units/${id}`, {
			_method: "DELETE",
		});
	};
	return {
		getCategories,
		saveItemUnits,
		deleteItemUnits,
		getItemUnits,
	};
};
