import axios from "@/libs/axios";
import { toast } from "react-toastify";
export const useItemCategories = () => {
	/* 
         FIELDS
            name
        */
	const getCategories = () => {
		return axios.get(`/management/categories`);
	};

	const saveItemCategory = async ({
		setErrors,
		setLoading,
		callback,
		...props
	}) => {
		if (props?.id) {
			axios
				.post(`/management/categories/${props?.id}`, {
					...props,
					_method: "PATCH",
				})
				.then((res) => {
					console.log("res", res);
					toast.success("Item category details updated successfully!");
					callback ? callback(res.data.data) : "";
				})
				.catch((error) => {
					toast.error(`Failed to submit form. Please check your inputs!`);
					if (error.response.status !== 422) throw error;
					setErrors(error.response.data.errors);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			axios
				.post("/management/categories", { ...props })
				.then((res) => {
					console.log("res", res);
					toast.success("Item category added successfully!");
					callback ? callback(res.data.data) : "";
				})
				.catch((error) => {
					toast.error(`Failed to submit form. Please check your inputs!`);
					if (error.response.status !== 422) throw error;
					setErrors(error.response.data.errors);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const deleteItemCategory = (id) => {
		return axios.post(`/management/categories/${id}`, {
			_method: "DELETE",
		});
	};
	return {
		getCategories,
		saveItemCategory,
		deleteItemCategory,
	};
};
