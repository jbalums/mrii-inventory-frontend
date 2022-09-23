import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
	FiHome,
	FiUsers,
	FiFileText,
	FiDatabase,
	FiGitBranch,
} from "react-icons/fi";
import FlatIcon from "../FlatIcon";

const LeftSidebarTitle = ({ text }) => {
	return <div className="font-bold text-xs text-placeholder my-2">{text}</div>;
};
const LeftSidebarLink = ({ icon, text, active, to }) => {
	return (
		<Link to={to} className="mb-2">
			<div
				className={`flex items-center px-2 py-3 hover:bg-slate-200 rounded-lg duration-100 text-sm ${
					active ? "bg-slate-200" : ""
				}`}
			>
				<span className="pt-[2.5px]">{icon}</span> {text}
			</div>
		</Link>
	);
};
const LeftSidebar = () => {
	const location = useLocation();
	const isActive = (name) => {
		return location.pathname == name;
	};
	return (
		<div className="shadow-xl bg-background flex flex-col relative md:w-64 z-10 pt-6 px-4 min-w-[240px]">
			<div className="pb-6">
				<img src={"mrii.png"} className="h-11" />
			</div>
			<LeftSidebarTitle text="Main menu" />
			<LeftSidebarLink
				icon={<FlatIcon icon="rs-pixabay" className="mr-4" />}
				text={`Dashboard`}
				to="/"
				active={isActive("/")}
			/>
			<LeftSidebarLink
				icon={<FlatIcon icon="rr-notebook" className="mr-4" />}
				text={`Request order`}
				to="/request-order"
				active={isActive("/request-order")}
			/>
			<LeftSidebarLink
				icon={<FlatIcon icon="rr-inbox-in" className="mr-4" />}
				text={`Receiving`}
				to="/receiving"
				active={isActive("/receiving")}
			/>
			<LeftSidebarLink
				icon={<FlatIcon icon="rr-boxes" className="mr-4" />}
				text={`Inventory`}
				to="/inventory"
				active={isActive("/inventory")}
			/>
			<LeftSidebarLink
				icon={<FiFileText className="w-5 mr-1" />}
				text={`Reports`}
				to="/reports"
				active={isActive("/reports")}
			/>
			<LeftSidebarTitle text="Admin menu" />
			<LeftSidebarLink
				icon={<FiUsers className="w-5 mr-1" />}
				text={`Users`}
				to="/users"
				active={isActive("/users")}
			/>
			<LeftSidebarLink
				icon={<FiFileText className="w-5 mr-1" />}
				text={`Item categories`}
				to="/item-categories"
				active={isActive("/item-categories")}
			/>
			<LeftSidebarLink
				icon={<FlatIcon icon="rs-map-marker" className="w-5 mr-1" />}
				text={`Locations`}
				to="/locations"
				active={isActive("/locations")}
			/>
		</div>
	);
};

export default LeftSidebar;
