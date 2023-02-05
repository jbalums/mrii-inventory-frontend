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
				className={`antialiased h-screen min-h-[720px] w-screen max-h-screen overflow-auto flex flex-col relative`}
			>
				<div className="w-full flex h-full z-[2] bg-opacity-40 overflow-hidden">
					<LeftSidebar user={user} />
					{/* <div className="absolute bg-red-500 p-4 rounded-lg top-4 left-4 z-20 h-11 w-11"></div> */}

					<div className="relative bg-slate-200 h-full w-full max-h-screen overflow-auto">
						<PageHeader
							title={title}
							icon={icon}
							backBtn={backBtn}
							breadcrumbs={breadcrumbs}
						>
							{titleChildren}
						</PageHeader>
						<div
							className={`p-4 lg:p-6 w-full animate-fadeIn ${containerClassName}`}
						>
							{children}
						</div>
					</div>
					<ToastContainer />
				</div>
			</div>
		</RootContextWrapper>
	);
};
const AppLayout = (props) => {
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

export default AppLayout;
