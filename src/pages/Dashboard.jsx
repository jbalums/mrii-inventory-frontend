import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import BarChart from "../components/charts/BarChart";
import DashboardWidget from "../components/widgets/DashboardWidget";
import axios from "@/libs/axios";

const Dashboard = () => {
	const [dashboard, setDashboard] = useState(null)

	useEffect(()=>{
		let t = setTimeout(()=>{
			getDashboardData()
		}, 500)

		return () => {
			clearTimeout(t)
		}
	}, [])

	const getDashboardData = () =>{
		axios.get(`inventory/dashboard-data`).then(res=>{
			setDashboard(res.data)
		})
	}
	
	const formatDate = (date) => {
		let d = new Date(date);
		return `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()} ${d.getHours() >= 12 ? 'PM':'AM'}`;
	}

	return (
		<AppLayout title="Dashboard">
			<div className="grid grid-cols-2 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
				<div className="">
					<DashboardWidget
						bgColor="border border-blue-600 bg-blue-600 bg-opacity-5"
						color="text-blue-600"
						title="Requests Received"
						count={dashboard?.request_received || '-'}
						icon="rr-inbox-in"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-green-600 bg-green-600 bg-opacity-5"
						color="text-green-600"
						title="Requests Accepted"
						count={dashboard?.requests_accepted || '-'}
						icon="rr-memo-circle-check"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-violet-600 bg-violet-600 bg-opacity-5"
						color="text-violet-600"
						title="Materials Received"
						count={dashboard?.materials_received || '-'}
						icon="rr-layer-plus"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-blue-600 bg-blue-600 bg-opacity-5"
						color="text-blue-600"
						title="Materials Issued"
						count={dashboard?.materials_issued || '-'}
						icon="rr-truck-loading"
					/>
				</div>
				<div className="">
					<DashboardWidget
						bgColor="border border-orange-400 bg-orange-400 bg-opacity-5"
						color="text-orange-400"
						title="Materials Returned"
						count={dashboard?.materials_returned || '-'}
						icon="rr-undo"
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				
				<div className="flex flex-col max-w-full overflow-auto">
					<h3 className="text-base mb-2"> Fast moving items</h3>
					<div className="table">
						<table>
							<thead>
								<tr>
									<th>Item Name</th>
									<th>Last moved</th>
								</tr>
							</thead>
							<tbody>
								{
									dashboard?.fast_moving_items?.map(item=>{
										return (<tr>
											<td>{item?.inventory?.product?.name}</td>
											<td>{formatDate(item?.inventory?.updated_at)}</td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
				</div>

				<div className="flex flex-col max-w-full overflow-auto">
					<h3 className="text-base mb-2">Inventory levels per product</h3>
					<div className="table">
						<table>
							<thead>
								<tr>
									<th>Item Name</th>
									<th className="text-center w-11">U/M</th>
									<th className="text-center w-11">Stock</th>
									<th className="text-center w-11">Low/Min Level</th>
									<th className="text-center w-11">Order Point</th>
								</tr>
							</thead>
							<tbody>
								{
									dashboard?.levels_per_product?.map(item=>{
										return (<tr>
											<td>{item?.inventory?.product?.name}</td>
											<td className="text-center">{item?.inventory?.product?.unit_measurement}</td>
											<td className="text-center">{item?.total_quantity}</td>
											<td className="text-center">{item?.stock_low_level}</td>
											<td className="text-center">{item?.reorder_point}</td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
				</div>

				<div className="flex flex-col max-w-full overflow-auto col-span-1">
					<h3 className="text-base mb-2">Inventory levels per branch</h3>
					<div className="table">
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
								{
									dashboard?.levels_per_branch?.map(item=>{
										return (<tr>
											<td>{item?.inventory?.product?.name}</td>
											<td className="text-left">{item?.location?.name}</td>
											<td className="text-center">{item?.inventory?.product?.unit_measurement}</td>
											<td className="text-center">{item?.total_quantity}</td> 
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</AppLayout>
	);
};

export default Dashboard;
