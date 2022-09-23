const useFormHelper = () => {
	const setErrors = (data, setError) => {
		if (data) {
			Object.keys(data).map((key) => {
				setError(key == "username" ? "email" : key, {
					type: "manual",
					message: data[key][0],
				});
			});
		}
	};

	return {
		setErrors,
	};
};

export default useFormHelper;
