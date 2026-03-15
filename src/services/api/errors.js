export const normalizeApiError = (error) => {
	const response = error?.response;
	const data = response?.data;
	const status = response?.status ?? null;
	const errors =
		data?.errors && typeof data.errors === "object" ? data.errors : {};

	return {
		status,
		data,
		errors,
		message:
			data?.message ||
			error?.message ||
			"An unexpected error occurred. Please try again.",
		originalError: error,
	};
};

export const isValidationError = (error) => error?.status === 422;

export const getApiErrorMessage = (error, fallbackMessage) =>
	error?.message || fallbackMessage;
