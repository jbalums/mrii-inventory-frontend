import { useAuth } from "@/hooks/useAuth";
import { useRootContext } from "@/src/context/RootContext";
import { useState } from "react";
import { useRef } from "react";
import { BiArrowToLeft } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import FlatIcon from "../FlatIcon";
import ConfirmModal from "../modals/ConfirmModal";

const LeftSidebarTitle = ({ text }) => {
	return (
		<div className="font-bold text-xs text-placeholder text-center lg:text-left my-2 px-4">
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
				className={`flex items-center font-normal bg-background h-11 text-dark px-4 duration-100 text-sm group ${
					active
						? "!bg-primary text-light !font-bold"
						: "hover:bg-foreground"
				}`}
			>
				<span className={collapseSidebar ? "ml-2 mr-6" : "mr-4"}>
					{icon}
				</span>
				<span
					className={`duration-200 transition-all backdrop-blur ${
						collapseSidebar
							? `opacity-0 min-w-[0px] w-0 group-hover:min-w-[200px] group-hover:opacity-100 group-hover:z-20 flex items-center group-hover:text-dark group-hover:bg-foreground h-full pl-4  ${
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
	const isActive = (name) => {
		return location.pathname.includes(name);
	};
	const hasPermission = (permitted_users = []) => {
		return permitted_users.includes(user?.data?.user_type);
	};
	return (
		<div
			className={`shadow-xl transition-all duration-300 bg-background flex flex-col relative md:w-64 z-10 
		${
			collapseSidebar
				? `pt-6 !px-0 !w-[64px] max-w-[64px] ${
						device == "mobile" ? "absolute top-0 left-0" : ""
				  }`
				: `pt-6 px-0 min-w-[240px] ${
						device == "mobile" ? "absolute top-0 left-0" : ""
				  }`
		}`}
		>
			<div
				className={`absolute top-[78px] h-6 w-6 opacity-50 hover:opacity-100 cursor-pointer rounded bg-primary text-white z-20 flex items-center justify-center ${
					collapseSidebar ? "left-[52px]" : "left-[228px]"
				}`}
				onClick={() => {
					dispatch({
						type: "TOGGLE_SIDEBAR",
					});
				}}
			>
				<BiArrowToLeft
					className={`text-2xl duration-200 ${
						collapseSidebar ? "rotate-180" : ""
					}`}
				/>
			</div>
			<div className={collapseSidebar ? "pb-6 px-2" : "pb-6 px-4"}>
				<img
					src={collapseSidebar ? "/mrii-icon.png" : "/mrii.png"}
					className={`duration-300 ${
						collapseSidebar ? "h-[44px]" : "h-11"
					}`}
				/>
			</div>
			<LeftSidebarTitle text="Main menu" />
			<LeftSidebarLink
				icon={<FlatIcon icon="rs-pixabay" />}
				text={`Dashboard`}
				to="/"
				active={isActive("/dashboard")}
			/>
			{/* <LeftSidebarLink
                icon={<FlatIcon icon="rr-notebook" />}
                text={`Request order`}
                to="/request-order"
                active={isActive("/request-order")}
            /> */}
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
					text={`Request order`}
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
				<LeftSidebarLink
					icon={<FlatIcon icon="rr-inbox-in" />}
					text={`Accept order`}
					to="/accept-orders"
					active={isActive("/accept-orders")}
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
						text={`Issuances`}
						to="/approving/issuances"
						active={isActive("/approving/issuances")}
					/>
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-badge-check" />}
						text={`Receiving Orders`}
						to="/receiving-orders"
						active={isActive("/receiving-orders")}
					/>
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-badge-check" />}
						text={`Approving Orders`}
						to="/approving/approve-request-order"
						active={isActive("/approving/approve-request-order")}
					/>
					<LeftSidebarLink
						icon={<FlatIcon icon="rr-badge-check" />}
						text={`Approving Issuances`}
						to="/approving/approve-issuance-order"
						active={isActive("/approving/approve-issuance-order")}
					/>
				</>
			)}
			{/* <LeftSidebarLink
				icon={<FlatIcon icon="rr-shopping-cart" />}
				text={`PO lists`}
				to="/po-lists"
				active={isActive("/po-lists")}
			/> */}
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
					text={`Receiving`}
					to="/receiving"
					active={isActive("/receiving")}
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
					icon={<FlatIcon icon="rr-boxes" />}
					text={`Inventory`}
					to="/inventory"
					active={isActive("/inventory")}
				/>
			)}
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
			<LeftSidebarTitle text="Logout" />
			<LeftSidebarLink
				icon={<FlatIcon icon="rs-sign-out-alt" />}
				text={`Logout`}
				to="/logout"
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					confirm_logout_ref.current.show();
				}}
			/>

			{/* <div className="mt-auto border-t p-4 flex items-center">
				<img src="" alt=" " className="w-10 h-10 border rounded-full" />
			</div> */}

			<ConfirmModal
				ref={confirm_logout_ref}
				title="Confirm logout"
				body={
					<p className="text-red-600 text-lg text-center my-3">
						Are you sure you want to Logout?{" "}
					</p>
				}
				footer={
					<div className="flex items-center">
						<Button
							onClick={() => {
								confirm_logout_ref.current.hide();
							}}
						>
							No
						</Button>
						<Button
							type="danger"
							className="ml-4"
							onClick={() => {
								setLoading(true);
								if (typeof window == "object") {
									window.localStorage.clear();
								}
								setTimeout(() => {
									// logout();
									confirm_logout_ref.current.hide();
									window.location.pathname = "/login";
								}, 500);
							}}
							loading={loading}
						>
							Yes
						</Button>
					</div>
				}
			/>
		</div>
	);
};

export default LeftSidebar;
