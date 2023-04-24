import { useAuth } from "@/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { RootContextWrapper } from "../context/RootContext";
import LeftSidebar from "./layout/LeftSidebar";
import PageHeader from "./layout/PageHeader";

import { Navigate } from "react-router-dom";
import FlatIcon from "./FlatIcon";
import { useEffect } from "react";
import { useState } from "react";
import SplashScreen from "./SplashScreen";
import LoadingScreen from "./LoadingScreen";
const Page = (props) => {
	const { user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	const {
		title,
		icon,
		titleChildren,
		breadcrumbs,
		children,
		backBtn = false,
		containerClassName = "",
	} = props;

	return (
		<RootContextWrapper>
			<div
				className={`h-[100dvh] w-screen max-h-[100dvh] overflow-auto flex flex-col relative`}
			>
				<div className="w-full flex h-full z-[2] overflow-hidden">
					{/* <div className="absolute bg-red-500 p-4 rounded-lg top-4 left-4 z-20 h-11 w-11"></div> */}

					<div className="relative  bg-slate-500 h-full w-full max-h-[100dvh] overflow-auto">
						<div
							className={`p-4 lg:p-6 w-full animate-fadeIn ${containerClassName}`}
						>
							{children}
						</div>
					</div>
				</div>
			</div>
		</RootContextWrapper>
	);
};
const PrintAppLayout = (props) => {
	const { user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setShowSplash(false);
		}, 1500);
	}, []);

	return user?.data?.id ? (
		<Page {...props} />
	) : showSplash ? (
		<LoadingScreen />
	) : (
		<Navigate to="/login" replace={true} />
	);
};

export default PrintAppLayout;
