import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";

const Dashboard = () => {
	return (
		<AppLayout title="Dashboard">
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-4">
					<div className="aspect-[3/1] bg-slate-200 rounded-lg"></div>
				</div>
				<div className="col-span-4">
					<div className="aspect-[3/1] bg-slate-200 rounded-lg"></div>
				</div>
				<div className="col-span-4">
					<div className="aspect-[3/1] bg-slate-200 rounded-lg"></div>
				</div>
				<div className="col-span-8">
					<div className="aspect-[3/1] bg-slate-200 rounded-lg"></div>
				</div>
				<div className="col-span-4">
					<div className="aspect-[3/2.05] bg-slate-200 rounded-lg"></div>
				</div>
			</div>
		</AppLayout>
	);
};

export default Dashboard;
