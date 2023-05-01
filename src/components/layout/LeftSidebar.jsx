import { useAuth } from "@/hooks/useAuth";
import { useRootContext } from "@/src/context/RootContext";
import { useEffect } from "react";
import { useCallback } from "react";
import { useRef, useState } from "react";
import { BiArrowToLeft } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import CollapseMenu from "../CollapseMenu";
import FlatIcon from "../FlatIcon";
import LeftSidebarLink from "../LeftSidebarLink";
import LeftSidebarTitle from "../LeftSidebarTitle";
import ConfirmModal from "../modals/ConfirmModal";
import MagicScrollBar from "./MagicScrollBar";

const LeftSidebar = () => {
	const location = useLocation();
	const {
		dispatch,
		theme: { collapseSidebar, device },
	} = useRootContext();
	const confirm_logout_ref = useRef(null);
	const [loading, setLoading] = useState(false);
	const { logout, user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	console.log("useruser", user);
	const isActive = useCallback(
		(name, mustNotInclude = null, exact = false) => {
			if (exact) {
				return location.pathname == name;
			} else {
				if (mustNotInclude) {
					if (location.pathname.includes(mustNotInclude)) {
						return false;
					} else {
						return location.pathname.includes(name);
					}
				}
			}

			return location.pathname.includes(name);
		},
		[]
	);
	const hasPermission = (permitted_users = []) => {
		return permitted_users.includes(user?.data?.user_type);
	};
	useEffect(() => {
		if (typeof window == "object") {
			console.log(
				"window?.outerWidth < 768 && !collapseSidebar",
				window?.innerWidth < 769,
				!collapseSidebar
			);
			if (window?.innerWidth < 769 && !collapseSidebar) {
				dispatch({
					type: "TOGGLE_SIDEBAR",
				});
			}
		}
	}, [window, device]);
	return (
		<div
			className={`hidden md:flex shadow-xl transition-all h-full duration-300 bg-background flex-col md:w-64 z-10 
		${
			collapseSidebar
				? `!relative pt-6 !px-0 !w-[64px] max-w-[64px] ${
						device == "mobile" ? " top-0 left-0" : ""
				  }`
				: `absolute
				lg:relative pt-0 px-0 min-w-[240px] ${
					device == "mobile" ? " top-0 left-0" : " "
				}`
		}`}
		>
			<img
				src="/warehouse-sm.jpg"
				className="absolute top-0 h-full z-[1] object-cover opacity-5"
			/>
			<div
				className={`absolute top-6 opacity-80 hover:opacity-100 cursor-pointer rounded bg-slate-300 bg-opacity-60 shadow-sm border border-gray-300 p-1 z-20 flex items-center justify-center ${
					collapseSidebar ? "left-[52px]" : "left-[228px]"
				} z-[5]`}
				onClick={() => {
					dispatch({
						type: "TOGGLE_SIDEBAR",
					});
				}}
			>
				<BiArrowToLeft
					className={`text-lg duration-100 ${
						collapseSidebar ? "rotate-180" : ""
					}`}
				/>
			</div>

			<div className="flex items-center p-2 px-4 gap-2 border-y relative h-[76px] bg-background z-[2]">
				<b className="text-primary">{user?.data?.branch?.name}</b>
				<FlatIcon
					icon="rr-warehouse-alt"
					className="-mt-[2px] absolute right-3 opacity-10 text-5xl text-primary"
				/>
			</div>

			<div className="max-h-[calc(100vh-76px)] z-[2] overflow-auto">
				<LeftSidebarTitle
					text="Main menu"
					collapseSidebar={collapseSidebar}
				/>
				<LeftSidebarLink
					icon={<FlatIcon icon="rr-home" />}
					text={`Dashboard`}
					to="/dashboard"
					active={isActive("/dashboard", null, true)}
				/>

				{hasPermission([
					"admin",
					"warehouse_man",
					"area_manger",
					"approving_manager",
					"bu_manager",
					"employee",
				]) && (
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-boxes" />}
						text={`Inventory`}
						to="/inventory"
						active={isActive("/inventory")}
					/>
				)}
				<LeftSidebarLink
					icon={<FlatIcon icon="rr-hand-holding-box" />}
					text={`Receiving`}
					to="/receiving"
					active={isActive("/receiving", "/receiving-orders")}
				/>
				<CollapseMenu
					containerClassName="sidebar-menu-collapse pl-4"
					titleClassName="flex items-center gap-2 font-normal h-11 text-dark px-4 !duration-200 text-sm hover:bg-foreground bg-opacity-0 hover:bg-opacity-100"
					title={
						<>
							<span className={`text-lg -mb-[6px]`}>
								<FlatIcon icon="br-list" />
							</span>
							Requests
						</>
					}
					titleOpenClassName={
						"!bg-primary text-light !font-semibold bg-opacity-80"
					}
					defaultOpen={
						isActive("/request-orders") ||
						isActive("/approving/approve-request-order") ||
						isActive("/accept-orders")
					}
				>
					{hasPermission([
						"admin",
						"warehouse_man",
						"area_manger",
						"approving_manager",
						"bu_manager",
						"employee",
					]) && (
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-add-document" />}
							text={`Requests`}
							to="/request-orders"
							active={isActive("/request-orders")}
						/>
					)}

					{hasPermission([
						"admin",
						"warehouse_man",
						"area_manger",
						"approving_manager",
						"bu_manager",
						"employee",
					]) && (
						<>
							<LeftSidebarLink
								icon={<FlatIcon icon="rr-badge-check" />}
								text={`Request Approval`}
								to="/approving/approve-request-order"
								active={isActive(
									"/approving/approve-request-order"
								)}
							/>
							{user?.data?.branch?.id == 1 && (
								<LeftSidebarLink
									icon={<FlatIcon icon="rr-box-check" />}
									text={`Request Acceptance`}
									to="/accept-orders"
									active={isActive("/accept-orders")}
								/>
							)}
						</>
					)}
				</CollapseMenu>

				{/* {user?.data?.branch?.id == 1 && (
					<CollapseMenu
						containerClassName="sidebar-menu-collapse pl-4"
						titleClassName="flex items-center gap-2 font-normal h-11 text-dark px-4 !duration-200 text-sm hover:bg-foreground bg-opacity-0 hover:bg-opacity-100"
						title={
							<>
								<span className={`text-lg -mb-[6px]`}>
									<FlatIcon icon="br-list" />
								</span>
								Issuances
							</>
						}
						titleOpenClassName={
							"!bg-primary text-light !font-semibold bg-opacity-80"
						}
						defaultOpen={
							isActive("/issuances") ||
							isActive("/for-approval-issuances")
						}
					>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-assept-document" />}
							text={`Issuance Approval`}
							to="/for-approval-issuances"
							active={isActive("/for-approval-issuances")}
						/>
					</CollapseMenu>
				)} */}
				{user?.data?.branch?.id == 1 && (
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-file-export" />}
						text={`Issuances`}
						to="/issuances"
						active={isActive("/issuances")}
					/>
				)}
				<LeftSidebarLink
					icon={<FlatIcon icon="rr-inbox-in" />}
					text={`Receiving Orders`}
					to="/receiving-orders"
					active={isActive("/receiving-orders")}
				/>
				<LeftSidebarLink
					icon={<FlatIcon icon="rr-diagram-project" />}
					text={`Project/Plant`}
					to="/for-project-or-plant-requests"
					active={isActive("/for-project-or-plant-requests")}
				/> 
				{/* <LeftSidebarLink
					icon={<FlatIcon icon="rr-box-open" />}
					text={`Repacking`}
					to="/repacking"
					active={isActive("/repacking")}
				/> */}
				{/* <LeftSidebarLink
				icon={<FlatIcon icon="rr-shopping-cart" />}
				text={`PO lists`}
				to="/po-lists"
				active={isActive("/po-lists")}
			/> */}

				{/* <LeftSidebarLink
				icon={<FlatIcon icon="rr-document" />}
				text={`Reports`}
				to="/reports"
				active={isActive("/reports")}
			/> */}

				<CollapseMenu
					containerClassName="sidebar-menu-collapse pl-4"
					titleClassName="flex items-center gap-2 font-normal h-11 text-dark px-4 !duration-200 text-sm hover:bg-foreground bg-opacity-0 hover:bg-opacity-100"
					title={
						<>
							<span className={`text-lg -mb-[6px]`}>
								<FlatIcon icon="br-list" />
							</span>
							Reports
						</>
					}
					titleOpenClassName={
						"!bg-primary text-light !font-semibold bg-opacity-80"
					}
					defaultOpen={
						isActive("/reports/item-costing") ||
						isActive("/reports/warehouse-issuance") ||
						isActive("/reports/inputs-of-receipts")
					}
				>
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-add-document" />}
						text={`Item costing`}
						to="/reports/item-costing"
						active={isActive("/reports/item-costing")}
					/>
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-add-document" />}
						text={`Warehouse issuance`}
						to="/reports/warehouse-issuance"
						active={isActive("/reports/warehouse-issuance")}
					/>
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-add-document" />}
						text={`Inputs of Receipts`}
						to="/reports/inputs-of-receipts"
						active={isActive("/reports/inputs-of-receipts")}
					/>
				</CollapseMenu>
				{hasPermission(["admin"]) && (
					<>
						<LeftSidebarTitle
							text="Admin menu"
							collapseSidebar={collapseSidebar}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-boxes" />}
							text={`Products`}
							to="/products"
							active={isActive("/products")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-users-alt" />}
							text={`Users`}
							to="/users"
							active={isActive("/users")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-apps" />}
							text={`Item categories`}
							to="/item-categories"
							active={isActive("/item-categories")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-map-marker" />}
							text={`Locations`}
							to="/locations"
							active={isActive("/locations")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rs-truck-moving" />}
							text={`Suppliers`}
							to="/suppliers"
							active={isActive("/suppliers")}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default LeftSidebar;
