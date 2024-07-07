import { useAuth } from "@/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { RootContextWrapper } from "../context/RootContext";
import LeftSidebar from "./layout/LeftSidebar";
import PageHeader from "./layout/PageHeader";

import { Navigate } from "react-router-dom";
import FlatIcon from "./FlatIcon";
import { useEffect, useRef } from "react";
import { useState } from "react";
import SplashScreen from "./SplashScreen";
import LoadingScreen from "./LoadingScreen";
import ConfirmModal from "./modals/ConfirmModal";
import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";
import Button from "./Button";
import axios from "@/libs/axios";
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
	const [loading, setLoading] = useState(false);
	const [inventoryStatus, setInventoryStatus] = useState({ pending: 0 });
	const initInventoryRef = useRef(null);
	useNoBugUseEffect({
		functions: () => {
			getStockStatus();
		},
	});
	useNoBugUseEffect({
		functions: () => {
			if (inventoryStatus.pending > 0) initInventoryRef.current.show();
		},
		params: [inventoryStatus.pending],
	});

	const getStockStatus = () => {
		axios.get("/inventory/status").then((res) => {
			setInventoryStatus({
				pending: res.data?.pending || 0,
			});
		});
	};
	const initInventory = () => {
		setLoading(true);
		axios.post("/inventory/populate").then((res) => {
			setTimeout(() => {
				toast.success("Product(s) initialization successful!");
				initInventoryRef.current.hide();
				setLoading(false);
			}, 2000);
		});
	};

	return (
		<RootContextWrapper>
			<div
				className={`antialiased h-[100dvh] w-screen max-h-[100dvh] overflow-auto flex flex-col relative`}
			>
				<div className="w-full flex h-full z-[2] bg-opacity-40 overflow-hidden">
					<LeftSidebar user={user} />
					{/* <div className="absolute bg-red-500 p-4 rounded-lg top-4 left-4 z-20 h-11 w-11"></div> */}

					<div className="relative bg-slate-200 h-full w-full max-h-[100dvh] overflow-auto">
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
				</div>
			</div>

			<ConfirmModal
				ref={initInventoryRef}
				title="Info"
				body={
					<>
						<p className="text- text-lg text-center py-5">
							You have{" "}
							<b className="text-red-600">
								{inventoryStatus.pending} product
								{inventoryStatus.pending > 1 ? "s" : ""}
							</b>{" "}
							that needs to be initialize.
						</p>
					</>
				}
				footer={
					<div className="flex items-center">
						{/* <Button onClick={closeConfirmDelete}>No</Button> */}
						<Button
							type="success"
							className="ml-4 font-bold"
							onClick={initInventory}
							loading={loading}
						>
							START INITIALIZATION
						</Button>
					</div>
				}
			/>
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
