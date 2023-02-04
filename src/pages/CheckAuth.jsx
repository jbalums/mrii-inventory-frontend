import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import SplashScreen from "../components/SplashScreen";
let token = null;
if (typeof window == "object") {
	token = window.localStorage.getItem("token");
}
const CheckAuth = () => {
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		let t = setTimeout(() => {
			setShowSplash(false);
		}, 1500);
		return () => {
			clearTimeout(t);
		};
	}, [token]);

	return showSplash ? (
		<LoadingScreen />
	) : token ? (
		<Navigate to="/dashboard" />
	) : (
		<Navigate to="/login" replace={true} />
	);
};

export default CheckAuth;
