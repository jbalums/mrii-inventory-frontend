import { cleanStr } from "@/libs/helpers";

const useFormHelper = () => {
	const renderMsg = (msg, field) => {
		switch (msg) {
			case "validation.unique":
				return `The ${cleanStr(field)} is already in use.`;

			default:
				return msg;
		}
	};

	const setErrors = (data, setError) => {
		if (data) {
			Object.keys(data).forEach((key) => {
				const field = key == "username" ? "email" : key;
				const message = Array.isArray(data[key]) ? data[key][0] : data[key];

				setError(field, {
					type: "manual",
					message: renderMsg(message, key),
				});
			});
		}
	};

	return {
		setErrors,
	};
};

export default useFormHelper;
