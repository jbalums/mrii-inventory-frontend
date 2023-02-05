import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/libs/axios";
import { setStorage } from "@/libs/storage";
import { toast } from "react-toastify";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
	let navigate = useNavigate();
	let params = useParams();

	const {
		data: user,
		error,
		mutate,
	} = useSWR(
		"/api/user",
		() =>
			axios
				.get("/user")
				.then((res) => res.data)
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					mutate("/verify-email");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
		}
	);

	const csrf = () => axios.get("/sanctum/csrf-cookie");

	const register = async ({ setErrors, ...props }) => {
		await csrf();
		setErrors([]);
		axios
			.post("/register", props)
			.then(() => mutate())
			.catch((error) => {
				if (error.response.status !== 422) throw error;
				setErrors(Object.values(error.response.data.errors).flat());
			});
	};

	const login = async ({ setErrors, setStatus, ...props }) => {
		await axios
			.post("/login", props)
			.then(async (result) => {
				setStatus("success");
				await setStorage("token", result.data.access_token);
				toast.success("Login success");
				mutate();
			})
			.catch((error) => {
				toast.error("Login failed! Please check your credentials.");
				if (error.response.status !== 422) throw error;
				setErrors(Object.values(error.response.data.errors).flat());
			});
	};

	const forgotPassword = async ({ setErrors, setStatus, email }) => {
		await csrf();
		setErrors([]);
		setStatus(null);
		axios
			.post("/forgot-password", { email })
			.then((response) => setStatus(response.data.status))
			.catch((error) => {
				if (error.response.status !== 422) throw error;
				setErrors(Object.values(error.response.data.errors).flat());
			});
	};

	const resetPassword = async ({ setErrors, setStatus, ...props }) => {
		await csrf();
		setErrors([]);
		setStatus(null);
		axios
			.post("/reset-password", { token: params.token, ...props })
			.then((response) =>
				navigate(`/login?reset=${btoa(response.data.status)}`)
			)
			.catch((error) => {
				if (error.response.status !== 422) throw error;
				setErrors(Object.values(error.response.data.errors).flat());
			});
	};

	const resendEmailVerification = ({ setStatus }) => {
		axios
			.post("/email/verification-notification")
			.then((response) => setStatus(response.data.status));
	};

	const logout = async () => {
		await axios.post("/logout");
		mutate();

		if (typeof window == "object") {
			window.localStorage.clear();
			window.location.pathname = "/login";
		}
		return true;
	};

	useEffect(() => {
		console.log("useruseruseruser", user);
		if (middleware === "guest" && redirectIfAuthenticated && user)
			navigate(redirectIfAuthenticated);
		if (middleware === "auth" && error) logout();
	}, [user, error]);

	return {
		user,
		register,
		login,
		forgotPassword,
		resetPassword,
		resendEmailVerification,
		logout,
		mutate,
	};
};
