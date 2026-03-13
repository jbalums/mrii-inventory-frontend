import axios from "@/libs/axios";
import useFormHelper from "@/src/helpers/useFormHelper";
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
			axios
				.post(`/inventory/receiving`, { ...formData })
				.then((res) => {
					console.log("res inventory/receiving", res);
					toast.success("New received PO created successfully!");
					if (typeof callback == "function") callback(res.data.data);
				})
				.catch((error) => {
					console.log("errror", error?.response);
					setLoading(false);
					toast.error(
						`Failed to submit the form. Please check your inputs!`
					);
					if (error?.response?.data?.errors) {
						setErrors(error?.response?.data?.errors, setError);
					}
					if (error?.response?.status !== 422) throw error;
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
