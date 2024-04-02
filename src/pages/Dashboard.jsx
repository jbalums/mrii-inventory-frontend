import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import BarChart from "../components/charts/BarChart";
import DashboardWidget from "../components/widgets/DashboardWidget";
import axios from "@/libs/axios";
import FlatIcon from "../components/FlatIcon";
import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";

const Dashboard = () => {
	const [dashboard, setDashboard] = useState(null);
	const [loading, setLoading] = useState(true);

	useNoBugUseEffect({
		functions: () => {
			setLoading(true);
			getDashboardData();
		},
		params: [1],
	});

	const getDashboardData = () => {
		axios.get(`inventory/dashboard-data`).then((res) => {
			setDashboard(res.data);
			setLoading(false);
		});
	};

	const getFastMovingItems = () => {
		// axios.get(`inventory/dashboard-data`).then((res) => {
		// 	setDashboard(res.data);
		// 	setLoading(false);
		// });
	};

	const formatDate = (date) => {
		let d = new Date(date);
		return `${d.getDay()}/${
			d.getMonth() + 1
		}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()} ${
			d.getHours() >= 12 ? "PM" : "AM"
		}`;
	};

	return (
		<AppLayout title="Dashboard">
			<div className="grid grid-cols-2 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
				<div className="">
					<DashboardWidget
						bgColor="border border-blue-600 bg-blue-600 bg-opacity-5"
						color="text-blue-600"
						title="Requests Received"
						count={dashboard?.request_received || "0"}
						icon="rr-inbox-in"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-green-600 bg-green-600 bg-opacity-5"
						color="text-green-600"
						title="Requests Accepted"
						count={dashboard?.requests_accepted || "0"}
						icon="rr-memo-circle-check"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-violet-600 bg-violet-600 bg-opacity-5"
						color="text-violet-600"
						title="Materials Received"
						count={dashboard?.materials_received || "0"}
						icon="rr-layer-plus"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-blue-600 bg-blue-600 bg-opacity-5"
						color="text-blue-600"
						title="Materials Issued"
						count={dashboard?.materials_issued || "0"}
						icon="rr-truck-loading"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-orange-500 bg-orange-500 bg-opacity-5"
						color="text-orange-500"
						title="Materials Returned"
						count={dashboard?.materials_returned || "0"}
						icon="rr-undo"
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="flex flex-col max-w-full overflow-auto rounded-lg border border-secondary bg-background animate-all duration-200">
					<h3 className="text-base mb- p-4 bg-secondary-dark text-white flex items-center gap-2">
						<FlatIcon icon="rr-time-fast" className="text-lg" />{" "}
						Fast moving items
					</h3>
					<div className="table duration-200">
						<table>
							<thead>
								<tr>
									<th>Item Name</th>
									<th>Last moved</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td
											colSpan={999}
											className="p-4 text-center text-placeholder animate-pulse"
										>
											Loading data...
										</td>
									</tr>
								) : dashboard?.fast_moving_items?.length ==
								  0 ? (
									<tr>
										<td
											colSpan={999}
											className="p-4 text-center text-placeholder"
										>
											No data to display.
										</td>
									</tr>
								) : (
									dashboard?.fast_moving_items?.map(
										(item) => {
											return (
												<tr>
													<td className="!py-2 !text-gray-500">
														{
															item?.inventory
																?.product?.name
														}
													</td>
													<td className="!py-2 !text-gray-500">
														{formatDate(
															item?.inventory
																?.updated_at
														)}
													</td>
												</tr>
											);
										}
									)
								)}
							</tbody>
						</table>
					</div>
				</div>

				<div className="flex flex-col max-w-full overflow-auto rounded-lg border border-indigo-700 bg-background animate-all duration-200">
					<h3 className="text-base mb- p-4 bg-indigo-500 text-white flex items-center gap-2">
						<FlatIcon icon="rr-box" className="text-lg" /> Inventory
						levels
					</h3>
					<div className="table duration-200">
						<table>
							<thead>
								<tr>
									<th>Item Name</th>
									<th className="text-center w-11">U/M</th>
									<th className="text-center w-11">Stock</th>
									<th className="text-center w-11">
										Low/Min Level
									</th>
									<th className="text-center w-11">
										Order Point
									</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td
											colSpan={999}
											className="p-4 text-center text-placeholder animate-pulse"
										>
											Loading data...
										</td>
									</tr>
								) : dashboard?.levels_per_product?.length ==
								  0 ? (
									<tr>
										<td
											colSpan={999}
											className="p-4 text-center text-placeholder"
										>
											No data to display.
										</td>
									</tr>
								) : (
									dashboard?.levels_per_product?.map(
										(item) => {
											return (
												<tr>
													<td>
														{
															item?.inventory
																?.product?.name
														}
													</td>
													<td className="text-center">
														{
															item?.inventory
																?.product
																?.unit_measurement
														}
													</td>
													<td className="text-center">
														{item?.total_quantity}
													</td>
													<td className="text-center">
														{item?.stock_low_level}
													</td>
													<td className="text-center">
														{item?.reorder_point}
													</td>
												</tr>
											);
										}
									)
								)}
							</tbody>
						</table>
					</div>
				</div>

				<div className="flex flex-col max-w-full overflow-auto rounded-lg border border-primary bg-background animate-all duration-200">
					<h3 className="text-base mb- p-4 bg-primary text-white flex items-center gap-2">
						<FlatIcon icon="rr-boxes" className="text-lg" />{" "}
						Inventory levels per branch
					</h3>
					<div className="table duration-200">
						<table>
							<thead>
								<tr>
									<th>Item Name</th>
									<th>Location</th>
									<th className="text-center w-11">U/M</th>
									<th className="text-center w-11">Stock</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td
											colSpan={999}
											className="p-4 text-center text-placeholder animate-pulse"
										>
											Loading data...
										</td>
									</tr>
								) : dashboard?.levels_per_branch?.length ==
								  0 ? (
									<tr>
										<td
											colSpan={999}
											className="p-4 text-center text-placeholder"
										>
											No data to display.
										</td>
									</tr>
								) : (
									dashboard?.levels_per_branch?.map(
										(item) => {
											return (
												<tr>
													<td>
														{
															item?.inventory
																?.product?.name
														}
													</td>
													<td className="text-left">
														{item?.location?.name}
													</td>
													<td className="text-center">
														{
															item?.inventory
																?.product
																?.unit_measurement
														}
													</td>
													<td className="text-center">
														{item?.total_quantity}
													</td>
												</tr>
											);
										}
									)
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default Dashboard;
