import useFormHelper from "@/src/helpers/useFormHelper";
import {
	getApiErrorMessage,
	isValidationError,
} from "@/src/services/api/errors";
import { inventoryApi } from "@/src/services/api/inventory";
import { toast } from "react-toastify";

const useInventory = () => {
	const { setErrors } = useFormHelper();
	const getLocations = () => {
		return inventoryApi.listUsers();
	};
	const saveProduct = ({
		setLoading,
		setError,
		callback,
		id,
		...formData
	}) => {
		setLoading(true);
		inventoryApi
			.updateTriggers(id, { ...formData })
			.then((data) => {
				toast.success("Inventory triggers updated!");
				callback ? callback(data.data) : "";
			})
			.catch((error) => {
				toast.error(
					getApiErrorMessage(
						error,
						"Failed to submit the form. Please check your inputs!",
					),
				);
				if (isValidationError(error)) {
					setErrors(error.errors, setError);
					return;
				}

				throw error;
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const savePrice = ({ setLoading, setError, callback, id, ...formData }) => {
		setLoading(true);
		inventoryApi
			.updatePrice(id, { ...formData })
			.then((data) => {
				toast.success("Inventory price updated!");
				callback ? callback(data.data) : "";
			})
			.catch((error) => {
				toast.error(
					getApiErrorMessage(
						error,
						"Failed to submit the form. Please check your inputs!",
					),
				);
				if (isValidationError(error)) {
					setErrors(error.errors, setError);
					return;
				}

				throw error;
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const saveInventoryCorrection = ({
		setLoading,
		setError,
		callback,
		...formData
	}) => {
		setLoading(true);
		inventoryApi
			.correctInventory({
				...formData,
			})
			.then((data) => {
				toast.success("Inventory correction saved!");
				callback ? callback(data.adjustments_data) : "";
			})
			.catch((error) => {
				toast.error(getApiErrorMessage(error));
				if (isValidationError(error)) {
					setErrors(error.errors, setError);
					return;
				}

				throw error;
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
		inventoryApi
			.updateBeginningBalance(id, { ...formData })
			.then((data) => {
				toast.success("Inventory beginning balance updated!");
				callback ? callback(data) : "";
			})
			.catch((error) => {
				toast.error(
					getApiErrorMessage(
						error,
						"Failed to submit the form. Please check your inputs!",
					),
				);
				if (isValidationError(error)) {
					setErrors(error.errors, setError);
					return;
				}

				throw error;
			})
			.finally(() => {
				setLoading(false);
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
		saveInventoryCorrection,
	};
};

export default useInventory;
