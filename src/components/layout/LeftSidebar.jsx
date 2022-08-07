import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiFileText, FiDatabase } from "react-icons/fi";

const LeftSidebarTitle = ({ text }) => {
	return (
		<div className="font-semibold text-sm text-placeholder my-2">{text}</div>
	);
};
const LeftSidebarLink = ({ icon, text, active, to }) => {
	return (
		<Link to={to} className="mb-2">
			<div
				className={`flex items-center px-2 py-3 hover:bg-slate-200 rounded-lg duration-100 ${
					active ? "bg-slate-200" : ""
				}`}
			>
				{icon} {text}
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
		<div className="shadow-xl bg-white flex flex-col relative md:w-64 z-10 pt-6 px-6 min-w-[256px]">
			<LeftSidebarTitle text="Main menu" />
			<LeftSidebarLink
				icon={<FiHome className="w-5 mr-1" />}
				text={`Dashboard`}
				to="/"
				active={isActive("/")}
			/>
			<LeftSidebarLink
				icon={<FiDatabase className="w-5 mr-1" />}
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
		</div>
	);
};

export default LeftSidebar;
