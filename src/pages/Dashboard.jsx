import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import BarChart from "../components/charts/BarChart";
import DashboardWidget from "../components/widgets/DashboardWidget";

const Dashboard = () => {
	return (
		<AppLayout title="Dashboard">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
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
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
				<div className="aspect-[3/2] bg-white bg-opacity-40 border-blue-500 border flex flex-col rounded-lg">
					<div className="font-bold p-4 border-b border-blue-500 bg-blue-500 bg-opacity-20 text-blue-800">
						Stocking Levels
					</div>
					<div className="p-4 w-full h-full">
						<BarChart />
					</div>
				</div>
				<div className="aspect-[3/2] bg-white bg-opacity-40 border-green-500 border flex flex-col rounded-lg">
					<div className="font-bold p-4 border-b border-green-500 bg-green-500 bg-opacity-20 text-green-800">
						Minimum Inventory Level
					</div>
					<div className="p-4 w-full h-full">
						<BarChart />
					</div>
				</div>
				<div className="aspect-[3/2] bg-white bg-opacity-40 border-violet-500 border flex flex-col rounded-lg">
					<div className="font-bold p-4 border-b border-violet-500 bg-violet-500 bg-opacity-20 text-violet-800">
						Logs
					</div>
					<div className="p-4 w-full h-full flex-flex-col gap-y-3">
						<div className="flex items-center gap-4 py-2">
							<div className="h-11 w-11 rounded-full bg-blue-400"></div>
							<div className="flex flex-col text-sm">
								<b>John Doe</b>
								<p className="text-xs">Received PO # 12345</p>
							</div>
							<span className="ml-auto text-xs">
								Mar 3, 2023 03:00 PM
							</span>
						</div>
						<div className="flex items-center gap-4 py-2">
							<div className="h-11 w-11 rounded-full bg-blue-400"></div>
							<div className="flex flex-col text-sm">
								<b>John Doe</b>
								<p className="text-xs">Received PO # 12345</p>
							</div>
							<span className="ml-auto text-xs">
								Mar 3, 2023 03:00 PM
							</span>
						</div>
						<div className="flex items-center gap-4 py-2">
							<div className="h-11 w-11 rounded-full bg-blue-400"></div>
							<div className="flex flex-col text-sm">
								<b>John Doe</b>
								<p className="text-xs">Received PO # 12345</p>
							</div>
							<span className="ml-auto text-xs">
								Mar 3, 2023 03:00 PM
							</span>
						</div>
						<div className="flex items-center gap-4 py-2">
							<div className="h-11 w-11 rounded-full bg-blue-400"></div>
							<div className="flex flex-col text-sm">
								<b>John Doe</b>
								<p className="text-xs">Received PO # 12345</p>
							</div>
							<span className="ml-auto text-xs">
								Mar 3, 2023 03:00 PM
							</span>
						</div>
						<div className="flex items-center gap-4 py-2">
							<div className="h-11 w-11 rounded-full bg-blue-400"></div>
							<div className="flex flex-col text-sm">
								<b>John Doe</b>
								<p className="text-xs">Received PO # 12345</p>
							</div>
							<span className="ml-auto text-xs">
								Mar 3, 2023 03:00 PM
							</span>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default Dashboard;
