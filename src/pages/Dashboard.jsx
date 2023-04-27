import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import BarChart from "../components/charts/BarChart";
import DashboardWidget from "../components/widgets/DashboardWidget";

const Dashboard = () => {
	return (
		<AppLayout title="Dashboard">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-6">
				<div className="">
					<DashboardWidget
						bgColor="border border-blue-600 bg-blue-600 bg-opacity-5"
						color="text-blue-600"
						title="Requests Received"
						count="10"
						icon="rr-inbox-in"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-green-600 bg-green-600 bg-opacity-5"
						color="text-green-600"
						title="Requests Accepted"
						count="10"
						icon="rr-memo-circle-check"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-violet-600 bg-violet-600 bg-opacity-5"
						color="text-violet-600"
						title="Materials Received"
						count="10"
						icon="rr-layer-plus"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-blue-600 bg-blue-600 bg-opacity-5"
						color="text-blue-600"
						title="Materials Issued"
						count="10"
						icon="rr-truck-loading"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-orange-400 bg-orange-400 bg-opacity-5"
						color="text-orange-400"
						title="Materials Returned"
						count="10"
						icon="rr-undo"
					/>
				</div>
			</div>
		</AppLayout>
	);
};

export default Dashboard;
