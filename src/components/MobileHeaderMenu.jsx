import { useAuth } from "@/hooks/useAuth";
import { useCallback } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRootContext } from "../context/RootContext";
import FlatIcon from "./FlatIcon";
import MobileMenuLink from "./MobileMenuLink";
import LeftSidebarTitle from "./LeftSidebarTitle";

const MobileHeaderMenu = ({ children }) => {
	const { logout, user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const {
		theme: { collapseSidebar },
	} = useRootContext();
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
		<>
			<div className="flex md:hidden mr-4">
				<div
					className="rounded-lg bg-slate-100 border border-border p-1 w-11 h-11 flex items-center justify-center"
					onClick={() => {
						setOpen((val) => !val);
					}}
				>
					<FlatIcon icon="rr-menu-burger" className="text-lg" />
				</div>
			</div>
			<div
				className={`duration-200 fixed overflow-hidden top-[76px] border-t border-l border-b left-0 gap-y-4 bg-foreground h-[calc(100vh-77px)] min-w-0 w-0 flex flex-col ${
					open ? "w-[calc(100vw)] py-4" : " p-0"
				}`}
			>
				<div className="max-h-[calc(100vh-108px)] overflow-auto px-6 min-w-[calc(100vw)]">
					<LeftSidebarTitle
						text="Main menu"
						collapseSidebar={collapseSidebar}
					/>
					<div className="grid grid-cols-2 gap-4 pb-4">
						<MobileMenuLink
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
							<MobileMenuLink
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
							<MobileMenuLink
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
								<MobileMenuLink
									icon={<FlatIcon icon="rr-badge-check" />}
									text={`Request Approval`}
									to="/approving/approve-request-order"
									active={isActive(
										"/approving/approve-request-order"
									)}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rr-box-check" />}
									text={`Request Acceptance`}
									to="/accept-orders"
									active={isActive("/accept-orders")}
								/>
								<MobileMenuLink
									icon={
										<FlatIcon icon="rr-hand-holding-box" />
									}
									text={`Receiving`}
									to="/receiving"
									active={isActive(
										"/receiving",
										"/receiving-orders"
									)}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rr-file-export" />}
									text={`Issuances`}
									to="/approving/issuances"
									active={isActive("/approving/issuances")}
								/>
								<MobileMenuLink
									icon={
										<FlatIcon icon="rr-assept-document" />
									}
									text={`Issuance Approval`}
									to="/approving/approve-issuance-order"
									active={isActive(
										"/approving/approve-issuance-order"
									)}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rr-inbox-in" />}
									text={`Receiving Orders`}
									to="/receiving-orders"
									active={isActive("/receiving-orders")}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rr-undo" />}
									text={`Return Materials`}
									to="/return-materials"
									active={isActive("/return-materials")}
								/>
								<MobileMenuLink
									icon={
										<FlatIcon icon="rr-diagram-project" />
									}
									text={`Project/Plant`}
									to="/for-project-or-plant-requests"
									active={isActive(
										"/for-project-or-plant-requests"
									)}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rr-box-open" />}
									text={`Repacking`}
									to="/repacking"
									active={isActive("/repacking")}
								/>
							</>
						)}
					</div>

					{/* <MobileMenuLink
				icon={<FlatIcon icon="rr-shopping-cart" />}
				text={`PO lists`}
				to="/po-lists"
				active={isActive("/po-lists")}
			/> */}

					{/* <MobileMenuLink
				icon={<FlatIcon icon="rr-document" />}
				text={`Reports`}
				to="/reports"
				active={isActive("/reports")}
			/> */}
					{hasPermission(["admin"]) && (
						<>
							<LeftSidebarTitle
								text="Admin menu"
								collapseSidebar={collapseSidebar}
							/>
							<div className="grid grid-cols-2 gap-4">
								<MobileMenuLink
									icon={<FlatIcon icon="rr-boxes" />}
									text={`Products`}
									to="/products"
									active={isActive("/products")}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rr-users-alt" />}
									text={`Users`}
									to="/users"
									active={isActive("/users")}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rr-apps" />}
									text={`Item categories`}
									to="/item-categories"
									active={isActive("/item-categories")}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rs-map-marker" />}
									text={`Locations`}
									to="/locations"
									active={isActive("/locations")}
								/>
								<MobileMenuLink
									icon={<FlatIcon icon="rs-truck-moving" />}
									text={`Suppliers`}
									to="/suppliers"
									active={isActive("/suppliers")}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default MobileHeaderMenu;
