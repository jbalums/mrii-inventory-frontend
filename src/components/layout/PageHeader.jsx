import { useAuth } from "@/hooks/useAuth";
import { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import DropdownMenu from "../DropdownMenu";
import FlatIcon from "../FlatIcon";
import MobileHeaderMenu from "../MobileHeaderMenu";
import ConfirmModal from "../modals/ConfirmModal";
import { Tooltip } from "react-tippy";
// import notificationService from "@/src/services/notificationService";

const PageHeader = (props) => {
	const { title, icon, children, backBtn, backAction, breadcrumbs } = props;

	const confirm_logout_ref = useRef(null);
	const [loading, setLoading] = useState(false);
	const { logout, user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	const navigate = useNavigate();

	useEffect(() => {
		// let channel = null;
		// let t = setTimeout(() => {
		// 	channel = notificationService.subscribe("test-notification");
		// 	channel.bind("test-event", function (data) {
		// 		console.log(JSON.stringify(data));
		// 	});
		// 	// const channel = notificationEcho.channel("notifications");
		// 	// channel.listen(".TestEvent", (data) => {
		// 	// 	// Handle incoming notifications
		// 	// 	console.log("TestEvent22", data);
		// 	// });
		// }, 500);
		// return () => {
		// 	clearTimeout(t);
		// 	if (channel?.unbind) channel.unbind();
		// };
	});

	return (
		<>
			<div className="flex min-h-[76px] sticky top-0 bg-background shadow-sm py-4 md:py-[unset] items-center justify-center md:justify-start md:items-center md:gap-y-0 border-b border-border px-4 pb-4 md:pb-0 md:px-6  md:flex-row z-[2]">
				<div className="flex items-center md:w-[unset]">
					<MobileHeaderMenu />
					<div className={"z-[2]"}>
						{/* "/mrii-icon.png" */}
						<img
							src={"/logo.png"}
							className={`duration-300 h-8 lg:h-11`}
						/>
					</div>
					{/* {backBtn ? (
						<div
							className="bg-white h-11 w-11 rounded-full flex items-center justify-center mr-4 cursor-pointer hover:shadow-sm duration-200"
							onClick={() => {
								if (backAction) {
									backAction();
								} else {
									navigate(-1);
								}
							}}
						>
							<FlatIcon
								icon="rr-arrow-small-left"
								className="text-3xl"
							/>
						</div>
					) : (
						""
					)} */}
				</div>
				<div className="ml-auto md:flex items-center ">
					{/* <Tooltip
						title="New request order notifications."
						position="bottom"
						trigger="mouseenter"
					>
						<div
							className="cursor-pointer"
							onClick={() => {
								navigate("/request-orders");
							}}
						>
							<DropdownMenu
								key={`notification-menu`}
								className="self-center place-self-end ml-4 pointer-events-none"
								menuButtonClassName="flex items-center flex items-center gap-1 md:gap-3 w-full"
								// menuClassName={"min-w-[128px]"}
							>
								<div className="min-h-[36px] min-w-[36px] rounded-full bg-white border border-border relative flex items-center justify-center">
									<FlatIcon icon="rr-bells" />
									<span className="bg-red-500 rounded-full text-white absolute w-5 h-5 text-xs -top-1 -right-2 flex items-center justify-center">
										1
									</span>
								</div>
							</DropdownMenu>
						</div>
					</Tooltip> */}
					<DropdownMenu
						className="self-center place-self-end ml-4 md:min-w-[128px]"
						menuButtonClassName="flex items-center flex items-center gap-1 md:gap-3 w-full"
						menuClassName={"min-w-[128px]"}
						options={[
							{
								label: (
									<>
										<FlatIcon icon="br-user" className="" />
										My profile
									</>
								),
								onClick: () => {
									navigate("/profile");
								},
								className:
									"text-secondary-dark hover:!text-white !duration-200",
							},
							{
								label: (
									<>
										<FlatIcon
											icon="rr-time-past"
											className=""
										/>
										My Logs
									</>
								),
								onClick: () => {
									navigate("/my-logs");
								},
								className:
									"text-secondary-dark hover:!text-white !duration-200",
							},
							...[
								user?.data?.user_type == "admin" && {
									label: (
										<>
											<FlatIcon
												icon="rr-settings"
												className=""
											/>
											Activity Logs
										</>
									),
									onClick: () => {
										navigate("/system-changes-logs");
									},
									className:
										"text-secondary-dark hover:!text-white !duration-200",
								},
							],

							/* 	{
								label: (
									<>
										<FlatIcon
											icon="br-mode-landscape"
											className=""
										/>
										Scan QR
									</>
								),
								onClick: () => {
									navigate("/scan-qr");
								},
								className:
									"text-secondary-dark hover:!text-white !duration-200",
							}, */
							{
								label: (
									<>
										<FlatIcon
											icon="br-sign-out-alt"
											className=""
										/>
										Logout
									</>
								),
								onClick: () => {
									confirm_logout_ref.current.show();
								},
								className:
									"text-secondary-dark hover:!text-white !duration-200",
							},
						]}
						menuChildren={
							<div className="flex flex-col items-center gap- py-2 mb-1 bg-slate-50">
								<div className="min-h-[44px] min-w-[44px] mb-1 rounded-full bg-white border border-border overflow-hidden">
									<img
										className="object-cover h-11 rounded-full w-11"
										src={
											user?.data?.avatar?.length > 0
												? user?.data?.avatar
												: `https://api.dicebear.com/5.x/initials/svg?seed=${user?.data?.name}&scale=75`
										}
									/>
								</div>
								<span className="text-center text-sm font-bold">
									{user?.data?.name}
								</span>
								<span className="text-center text-xs text-placeholder">
									{user?.data?.branch?.name}
								</span>
							</div>
						}
					>
						<div className="min-h-[36px] min-w-[36px] rounded-full bg-white border border-border overflow-hidden">
							<img
								className="h-[36px] w-[36px] object-cover bg-slate-600"
								src={
									user?.data?.avatar?.length > 0
										? user?.data?.avatar
										: `https://api.dicebear.com/5.x/initials/svg?seed=${user?.data?.name}&scale=75`
								}
							/>
						</div>
						<span className=" hidden md:block">
							Hi, {user?.data?.firstname}!
						</span>
						<span className="text-dark mt-1 lg:ml-auto">
							<FlatIcon icon="rr-caret-down" />
						</span>
					</DropdownMenu>
				</div>
				<ConfirmModal
					ref={confirm_logout_ref}
					title="Confirm logout"
					body={
						<p className=" text-lg text-center my-3">
							Are you sure you want to <b>logout user</b>?{" "}
						</p>
					}
					footer={
						<div className="flex items-center ml-auto gap-4">
							<Button
								className=""
								onClick={() => {
									confirm_logout_ref.current.hide();
								}}
							>
								No
							</Button>
							<Button
								type="success"
								onClick={() => {
									setLoading(true);
									if (typeof window == "object") {
										window.localStorage.clear();
									}
									setTimeout(() => {
										// logout();
										confirm_logout_ref.current.hide();
										window.location.pathname = "/login";
									}, 1000);
								}}
								loading={loading}
							>
								Yes, logout
							</Button>
						</div>
					}
				/>
			</div>
			<div className="w-full py-4 px-4 md:px-6 gap-4 flex flex-col md:flex-row md:items-center bg-slate-300 bg-opacity-50">
				{title ? (
					<div className="flex flex-col">
						<div className="flex items-center gap-2 text-primary-dark text-xl">
							{icon && icon}
							<h1 className="  font-bold mb-0">{title}</h1>
						</div>
						<nav className="flex items-center text-xs font-medium text-blue-900 gap-[2px] mt-1">
							<Link to={`/`} className=" hover:text-blue-700">
								Home
							</Link>
							{breadcrumbs?.map((data, index) => {
								return (
									<Fragment key={`breadcrumb-${index}`}>
										<FlatIcon
											key={`bc-${data?.label}`}
											icon="rr-angle-small-right"
											className="-mb-[3px]"
										/>
										<Link
											to={`${data?.to}`}
											key={`bl-link-${data?.label}`}
											className={` hover:text-blue-700 ${
												breadcrumbs?.length - 1 == index
													? "font-semibold"
													: ""
											}`}
										>
											{data?.label}
										</Link>
									</Fragment>
								);
							})}
						</nav>
					</div>
				) : (
					""
				)}
				{children ? children : ""}
			</div>
		</>
	);
};

export default PageHeader;
