import React from "react";
import AppLayout from "../components/AppLayout";

const Dashboard = () => {
	return (
		<AppLayout>
			<div className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
				Sidebar
			</div>
			<div className="relative md:ml-64 bg-slate-100 h-full">
				<div className="p-6"></div>
			</div>
		</AppLayout>
	);
};

export default Dashboard;
