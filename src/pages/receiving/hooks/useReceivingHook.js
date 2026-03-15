import useFormHelper from "@/src/helpers/useFormHelper";
import { isValidationError } from "@/src/services/api/errors";
import { receivingApi } from "@/src/services/api/receiving";
import { toast } from "react-toastify";

const useReceiving = () => {
	const { setErrors } = useFormHelper();
	const saveReceiving = ({
		id,
		setLoading,
		setError,
		callback,
		...formData
	}) => {
		setLoading(true);
		if (!id) {
			receivingApi
				.create({ ...formData })
				.then((data) => {
					toast.success("New received PO created successfully!");
					if (typeof callback == "function") callback(data.data);
				})
				.catch((error) => {
					toast.error(
						`Failed to submit the form. Please check your inputs!`
					);
					if (isValidationError(error) && error?.errors) {
						setErrors(error.errors, setError);
						return;
					}

					throw error;
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
			toast.error("Updating received PO is not supported yet.");
			return Promise.reject(
				new Error("Updating received PO is not supported yet."),
			);
		}
	};
	return { saveReceiving };
};

export default useReceiving;
