import axios from "@/libs/axios";

const useInventory = () => {
	const getLocations = () => {
		return axios.get("/management/users");
	};
	const saveProduct = (formData, setLoading, setErrors) => {
		setLoading(true);
		axios
			.post(`/management/products`, { ...formData })
			.then((res) => {
				console.log("res", res);
				toast.success("New product created successfully!");
				// callback ? callback(res.data.data) : "";
			})
			.catch((error) => {
				toast.error(`Failed to submit form. Please check your inputs!`);
				if (error.response.status !== 422) throw error;
				setErrors(error.response.data.errors);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return { getLocations, saveProduct };
};

export default useInventory;
