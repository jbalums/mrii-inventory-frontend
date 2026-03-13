import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/libs/axios";
import { clear, remove, setStorage } from "@/libs/storage";
import { toast } from "react-toastify";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
	let navigate = useNavigate();

	const {
		data: user,
		error,
		mutate,
	} = useSWR("/api/user", () => axios.get("/user").then((res) => res.data), {
		revalidateIfStale: true,
		revalidateOnFocus: true,
	});
	const {
		data: notifications,
		error: errorNotifications,
		mutate: mutateNotifications,
	} = useSWR(
		"/api/inventory/notifications",
		() => axios.get("/inventory/notifications").then((res) => res.data),
		{
			revalidateIfStale: true,
			// refreshInterval: 5000,
			revalidateOnFocus: true,
		}
	);

	const clearSession = async () => {
		await remove("token");
		await clear();

		if (typeof window == "object") {
			window.location.pathname = "/login";
		}
	};

	const logout = async () => {
		try {
			await axios.post("/logout");
		} finally {
			await mutate(null, false);
			await clearSession();
		}

		return true;
	};

	const login = async ({ setErrors, setStatus, ...props }) => {
		try {
			const result = await axios.post("/login", props);

			setStatus?.("success");
			await setStorage("token", result.data.access_token);
			toast.success("Login success");
			await mutate();
		} catch (error) {
			toast.error("Login failed! Please check your credentials.");
			if (error.response?.status !== 422) throw error;
			setStatus?.(422);
			setErrors?.(Object.values(error.response.data.errors).flat());
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
