import axios from "@/libs/axios";
import useFormHelper from "@/src/helpers/useFormHelper";
import { toast } from "react-toastify";

const useInventory = () => {
	const { setErrors } = useFormHelper();
	const getLocations = () => {
		return axios.get("/management/users");
	};
	const saveProduct = ({
		setLoading,
		setError,
		callback,
		id,
		...formData
	}) => {
		setLoading(true);
		axios
			.post(`/inventory/triggers/${id}`, { ...formData })
			.then((res) => {
				console.log("res", res);
				toast.success("Inventory triggers updated!");
				callback ? callback(res.data.data) : "";
			})
			.catch((error) => {
				console.log("errorerrorerror", error);
				// toast.error(
				// 	`Failed to submit the form. Please check your inputs!`
				// );
				// if (error.response.status !== 422) throw error;
				// setErrors(error.response.data.errors, setError);
			})
			.finally(() => {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			});
	};

	const savePrice = ({ setLoading, setError, callback, id, ...formData }) => {
		setLoading(true);
		axios
			.post(`/inventory/price/${id}`, { ...formData })
			.then((res) => {
				console.log("res", res);
				toast.success("Inventory price updated!");
				callback ? callback(res.data.data) : "";
			})
			.catch((error) => {
				console.log("errorerrorerror", error);
				// toast.error(
				// 	`Failed to submit the form. Please check your inputs!`
				// );
				// if (error.response.status !== 422) throw error;
				// setErrors(error.response.data.errors, setError);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const updateBeginningBalance = ({
		setLoading,
		setError,
		callback,
		id,
		...formData
	}) => {
		setLoading(true);
		axios
			.post(`/inventory/beginning-balance/${id}`, { ...formData })
			.then((res) => {
				console.log("res", res);
				toast.success("Inventory beginning balance updated!");
				callback ? callback(res.data) : "";
			})
			.catch((error) => {
				console.log("errorerrorerror", error);
				// toast.error(
				// 	`Failed to submit the form. Please check your inputs!`
				// );
				// if (error.response.status !== 422) throw error;
				// setErrors(error.response.data.errors, setError);
			})
			.finally(() => {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			});
	};

	const businessUnits = [
		{
			code: "CBU",
			name: "Chemical Business Unit",
		},
		{
			code: "EBU",
			name: "Electrical Business Unit",
		},
		{
			code: "WBU",
			name: "Water Business Unit",
		},
	];
	return {
		getLocations,
		saveProduct,
		updateBeginningBalance,
		savePrice,
		businessUnits,
	};
};

export default useInventory;
