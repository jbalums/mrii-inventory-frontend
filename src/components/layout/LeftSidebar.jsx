import { useAuth } from "@/hooks/useAuth";
import { useRootContext } from "@/src/context/RootContext";
import { useCallback } from "react";
import { useRef, useState } from "react";
import { BiArrowToLeft } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import FlatIcon from "../FlatIcon";
import ConfirmModal from "../modals/ConfirmModal";
import MagicScrollBar from "./MagicScrollBar";

const LeftSidebarTitle = ({ className = "", text }) => {
	return (
		<div
			className={`font-semibold text-xs text-dark tracking-wide text-left my-2 px-4 ${className}`}
		>
			{text}
		</div>
	);
};
const LeftSidebarLink = ({ icon, text, active, to, onClick }) => {
	const {
		theme: { collapseSidebar },
	} = useRootContext();
	return (
		<Link to={to} className="" onClick={onClick}>
			<div
				className={`flex items-center font-normal bg-background  h-11 text-dark px-4 !duration-200 text-sm group ${
					active
						? "!bg-primary text-light !font-semibold bg-opacity-100"
						: "hover:bg-foreground bg-opacity-0 hover:bg-opacity-100"
				}`}
			>
				<span
					className={`text-lg ${
						collapseSidebar ? "ml-2 mr-3" : "mr-2"
					}`}
				>
					{icon}
				</span>
				<span
					className={`duration-200 transition-all ${
						collapseSidebar
							? `opacity-0 min-w-[0px] w-0 overflow-hidden group-hover:min-w-[200px] group-hover:opacity-100 group-hover:z-20 flex items-center group-hover:text-dark group-hover:bg-foreground h-full pl-4  ${
									active
										? "group-hover:text-light group-hover:!bg-primary"
										: ""
							  }`
							: ""
					}`}
				>
					{text}
				</span>
			</div>
		</Link>
	);
};
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
	return (
		<div
			className={`shadow-xl transition-all h-full duration-300 bg-background  flex flex-col md:w-64 z-10 
		${
			collapseSidebar
				? `!relative pt-6 !px-0 !w-[64px] max-w-[64px] ${
						device == "mobile" ? " top-0 left-0" : ""
				  }`
				: `absolute
				lg:relative pt-6 px-0 min-w-[240px] ${
					device == "mobile" ? " top-0 left-0" : " "
				}`
		}`}
		>
			<img
				src="/warehouse-sm.jpg"
				className="absolute top-0 h-full z-[1] object-cover opacity-5"
			/>
			<div
				className={`absolute top-[74px] h-8 w-8 opacity-50 hover:opacity-100 cursor-pointer rounded bg-primary text-white z-20 flex items-center justify-center ${
					collapseSidebar ? "left-[52px]" : "left-[228px]"
				} z-[5]`}
				onClick={() => {
					dispatch({
						type: "TOGGLE_SIDEBAR",
					});
				}}
			>
				<BiArrowToLeft
					className={`text-4xl duration-200 ${
						collapseSidebar ? "rotate-180" : ""
					}`}
				/>
			</div>
			<div
				className={
					collapseSidebar ? "pb-6 px-2 z-[2]" : "pb-6 px-4 z-[2]"
				}
			>
				<img
					src={collapseSidebar ? "/mrii-icon.png" : "/logo.png"}
					className={`duration-300 ${
						collapseSidebar ? "h-[44px]" : "h-11"
					}`}
				/>
			</div>

			<div className="max-h-[calc(100vh-95px)] z-[2]">
				<LeftSidebarTitle text="Main menu" />
				<LeftSidebarLink
					icon={<FlatIcon icon="rs-pixabay" />}
					text={`Dashboard`}
					to="/"
					active={isActive("/", null, true)}
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

				{hasPermission([
					"admin",
					"warehouse_man",
					"area_manger",
					"approving_manager",
					"bu_manager",
					"employee",
				]) && (
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-inbox-in" />}
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
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-box-check" />}
							text={`Request Acceptance`}
							to="/accept-orders"
							active={isActive("/accept-orders")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-hand-holding-box" />}
							text={`Receiving`}
							to="/receiving"
							active={isActive("/receiving", "/receiving-orders")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-file-export" />}
							text={`Issuances`}
							to="/approving/issuances"
							active={isActive("/approving/issuances")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-assept-document" />}
							text={`Issuance Approval`}
							to="/approving/approve-issuance-order"
							active={isActive(
								"/approving/approve-issuance-order"
							)}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-inbox-in" />}
							text={`Receiving Orders`}
							to="/receiving-orders"
							active={isActive("/receiving-orders")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-undo" />}
							text={`Return Materials`}
							to="/return-materials"
							active={isActive("/return-materials")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-diagram-project" />}
							text={`Project/Plant`}
							to="/for-project-or-plant-requests"
							active={isActive("/for-project-or-plant-requests")}
						/>
						<LeftSidebarLink
							icon={<FlatIcon icon="rr-box-open" />}
							text={`Repacking`}
							to="/repacking"
							active={isActive("/repacking")}
						/>
					</>
				)}

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
				{hasPermission(["admin"]) && (
					<>
						<LeftSidebarTitle text="Admin menu" />
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
							icon={<FlatIcon icon="rs-map-marker" />}
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
