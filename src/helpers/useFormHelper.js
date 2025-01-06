import { cleanStr } from "@/libs/helpers";

const useFormHelper = () => {
	
	const renderMsg = (msg, field) => {
		switch (msg) {
			case 'validation.unique':
				return `The ${cleanStr(field)} is already in use.`
		
			default:
				return msg;
		}h
	}
	const setErrors = (data, setError) => {
		if (data) {
			Object.keys(data).map((key) => {
				setError(key == "username" ? "email" : key, {
					type: "manual",
					message: renderMsg(data[key][0],  key),
				});
			});
		}
	};

	return {
		setErrors,
	};
};

export default useFormHelper;
