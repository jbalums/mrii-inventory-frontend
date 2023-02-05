import axios from "@/libs/axios";
import { toast } from "react-toastify";
export const useUserHook = () => {
	/* 
         FIELDS
            firstname
            lastname
            contact
            middlename
            user_type
            email
            username
            password
            confirm_password
        */
	const user_type_list = [
		{
			value: "admin",
		},
	];

	const saveUser = async ({
		setErrors,
		setLoading,
		callback,
		formData,
		...props
	}) => {
		if (props?.id) {
			axios
				.post(`/management/users/${props?.id}`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					console.log("res", res);
					toast.success("User details updated successfully!");
					callback ? callback(res.data.data) : "";
				})
				.catch((error) => {
					toast.error(
						`Failed to submit the form. Please check your inputs!`
					);
					if (error.response.status !== 422) throw error;
					setErrors(error.response.data.errors);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			axios
				.post("/management/users", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					console.log("res", res);
					toast.success("User added successfully!");
					callback ? callback(res.data.data) : "";
				})
				.catch((error) => {
					toast.error(
						`Failed to submit the form. Please check your inputs!`
					);
					if (error.response.status !== 422) throw error;
					setErrors(error.response.data.errors);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const deleteUser = (id) => {
		return axios.post(`/management/user/${id}`, {
			_method: "DELETE",
		});
	};
	return {
		saveUser,
		deleteUser,
	};
};
