import { isValidationError } from "@/src/services/api/errors";
import { usersApi } from "@/src/services/api/users";
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
		try {
			const data = props?.id
				? await usersApi.update(props.id, formData)
				: await usersApi.create(formData);

			toast.success(
				props?.id
					? "User details updated successfully!"
					: "User added successfully!",
			);
			callback ? callback(data.data) : "";
		} catch (error) {
			toast.error(`Failed to submit the form. Please check your inputs!`);
			if (!isValidationError(error)) throw error;
			setErrors(error.errors);
		} finally {
			setLoading(false);
		}
	};
	const getUserLogs = async ({ setLoading, setOperations }) => {
		try {
			setLoading(true);
			const { data } = await usersApi.logs();
			setOperations(data);
		} catch (error) {
			toast.error(`Failed to fetch user logs!`);
		} finally {
			setLoading(false);
		}
	};
	const deleteUser = (id) => {
		return usersApi.delete(id);
	};

	return {
		saveUser,
		deleteUser,
		getUserLogs,
	};
};
