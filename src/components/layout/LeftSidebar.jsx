import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers } from "react-icons/fi";
const LeftSidebar = () => {
	return (
		<div className="shadow-xl bg-white flex flex-col relative md:w-64 z-10 pt-6 px-6 min-w-[256px]">
			<Link to="/" className="mb-2">
				<div className="flex items-center px-2 py-3 hover:bg-slate-200 rounded-lg duration-100">
					<FiHome className="w-5 mr-1" /> Dashboard
				</div>
			</Link>
			<Link to="/" className="mb-2">
				<div className="flex items-center px-2 py-3 hover:bg-slate-200 rounded-lg duration-100">
					<FiHome className="w-5 mr-1" /> Request to purchase
				</div>
			</Link>
			<Link to="/" className="mb-2">
				<div className="flex items-center px-2 py-3 hover:bg-slate-200 rounded-lg duration-100">
					<FiHome className="w-5 mr-1" /> Inventory
				</div>
			</Link>
			<Link to="/users" className="mb-2">
				<div className="flex items-center px-2 py-3 hover:bg-slate-200 rounded-lg duration-100">
					<FiUsers className="w-5 mr-1" /> Users
				</div>
			</Link>
		</div>
	);
};

export default LeftSidebar;
