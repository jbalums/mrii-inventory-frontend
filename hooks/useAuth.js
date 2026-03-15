import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clear, remove, setStorage } from "@/libs/storage";
import { authApi } from "@/src/services/api/auth";
import { isValidationError } from "@/src/services/api/errors";
import { toast } from "react-toastify";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
	let navigate = useNavigate();

	const {
		data: user,
		error,
		mutate,
	} = useSWR("auth.current-user", authApi.getCurrentUser, {
		revalidateIfStale: true,
		revalidateOnFocus: true,
	});
	const {
		data: notifications,
		error: errorNotifications,
		mutate: mutateNotifications,
	} = useSWR("auth.notifications", authApi.getNotifications, {
		revalidateIfStale: true,
		revalidateOnFocus: true,
	});

	const clearSession = async () => {
		await remove("token");
		await clear();

		if (typeof window == "object") {
			window.location.pathname = "/login";
		}
	};

	const logout = async () => {
		try {
			await authApi.logout();
		} finally {
			await mutate(null, false);
			await clearSession();
		}

		return true;
	};

	const login = async ({ setErrors, setStatus, ...props }) => {
		try {
			const result = await authApi.login(props);

			setStatus?.("success");
			await setStorage("token", result.access_token);
			toast.success("Login success");
			await mutate();
		} catch (error) {
			toast.error("Login failed! Please check your credentials.");
			if (!isValidationError(error)) throw error;
			setStatus?.(422);
			setErrors?.(Object.values(error.errors || {}).flat());
		}
	};

	useEffect(() => {
		if (middleware === "guest" && redirectIfAuthenticated && user)
			navigate(redirectIfAuthenticated);
		if (middleware === "auth" && error) clearSession();
	}, [user, error, middleware, redirectIfAuthenticated, navigate]);

	return {
		user,
		login,
		logout,
		mutate,
		notifications,
		errorNotifications,
		mutateNotifications,
	};
};
