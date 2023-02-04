import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import SplashScreen from "../components/SplashScreen";

const CheckAuth = () => {
	const { user } = useAuth({
		middleware: "auth",
	});
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		let t = setTimeout(() => {
			setShowSplash(false);
		}, 1500);
		return () => {
			clearTimeout(t);
		};
	}, [user?.data?.id]);

	return showSplash ? (
		<LoadingScreen />
	) : user?.data?.id ? (
		<Navigate to="/dashboard" />
	) : (
		<Navigate to="/login" />
	);
};

export default CheckAuth;
