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
			axios
				.post(`/inventory/receiving/${id}`, {
					_method: "PATCH",
					...formData,
				})
				.then((res) => {
					console.log("res", res);
					toast.success("PO recieved updated successfully!");
					if (typeof callback == "function") callback(res.data.data);
				})
				.catch((error) => {
					console.log("errror", error);
					toast.error(
						`Failed to submit the form. Please check your inputs!`
					);
					if (error?.response?.status !== 422) throw error;
					if (error?.response?.data?.errors) {
						setErrors(error?.response?.data?.errors, setError);
					}
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	return { saveReceiving };
};

export default useReceiving;
