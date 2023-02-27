import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import AffirmationModal from "@/src/components/modals/AffirmationModal";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequisitions } from "@/src/pages/approving/hooks/useRequisitions.js";
import Table from "@/src/components/table/Table.jsx";
import CardLayout from "@/src/components/layout/CardLayout.jsx";
import RequestOrderCard from "../request-orders/components/RequestOrderCard";
import { requestOrderStatus } from "@/libs/elementsHelper";
const ViewCompletedRequest = () => {
	const complete_order_ref = useRef(null);
	const remarks_form_ref = useRef(null);
	const view_remarks_form_ref = useRef(null);
	const return_ref = useRef(null);
	const { approvedRequisition } = useRequisitions();
	const navigate = useNavigate();

	const { id } = useParams();

	const { data, loading: dataLoading } = useDataTable(
		`/inventory/requisition/${id}`,
		null
	);

	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "product.code",
				className: "",
				cellClassName: "",
			},
			{
				header: "Name",
				accessorKey: "product.name",
				className: " !font-bold",
				cellClassName: "",
			},
			{
				header: "UoM",
				accessorKey: "product.uom",
				className: "",
				cellClassName: "",
			},
			{
				header: "Quantity",
				accessorKey: "request_quantity",
				className: "",
				cellClassName: "",
			},
		],
		[]
	);

	useEffect(() => {
		console.log("data", data?.data?.details);
	}, [data?.data]);

	return (
		<AppLayout
			title="View request"
			backBtn
			titleChildren={
				<div className="ml-auto flex items-start justify-center gap-4">
					<div className="h-11 border-r border-border"></div>
					{data?.data?.status == "pending" && (
						<Button
							size="lg"
							type="accent"
							onClick={() => {
								complete_order_ref.current.show();
							}}
						>
							<FlatIcon icon="br-check" /> Accept Request
						</Button>
					)}
				</div>
			}
			breadcrumbs={[
				{
					to: "/request-orders",
					label: "Request orders",
				},
				{
					to: `/request-orders/view-completed/${data?.data?.id}`,
					label: "View request",
				},
			]}
		>
			<div className="w-full">
				<div className="flex flex-col gap-y-6 pt-6">
					{/* 	<p className="text-sm text-dark">
						All ordered items will deliver by location
					</p> */}

					<RequestOrderCard
						data={data?.data}
						status={{
							title: "Status:",
							value: (
								<div className="!text-lg !font-bold">
									{requestOrderStatus["completed"]}
								</div>
							),
						}}
					/>

					{data?.data?.details?.map((request) => (
						<CardLayout className="!p-0 !bg-background !shadow-sm">
							<div className="border-b px-4 py-6 flex flex-col lg:flex-row gap-4 items-center">
								<div className="text-lg font-light">
									<span>Order location:</span>
									<b> {request.location.name}</b>
								</div>
								<div className="lg:ml-auto gap-4 flex items-center">
									<p>
										Date neeed:{" "}
										<b className="text-blue-700">
											{data?.data.date_needed}
										</b>
									</p>
								</div>
							</div>
							<Table
								rowClick={(data) => {}}
								columns={columns}
								pagination={false}
								loading={dataLoading}
								data={request.items}
								emptyMessage={`You don’t have an order`}
							/>
						</CardLayout>
					))}
				</div>
			</div>
		</AppLayout>
	);
};

export default ViewCompletedRequest;
