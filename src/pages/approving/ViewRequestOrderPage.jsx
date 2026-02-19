import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import AffirmationModal from "@/src/components/modals/AffirmationModal";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import RemarksFormModal from "./components/RemarksFormModal";
import ViewRemarksModal from "./components/ViewRemarksModal";
import { useRequisitions } from "@/src/pages/approving/hooks/useRequisitions.js";
import Table from "@/src/components/table/Table.jsx";
import CardLayout from "@/src/components/layout/CardLayout.jsx";
import RequestOrderCard from "../request-orders/components/RequestOrderCard";

const ViewRequestOrderPage = () => {
	const complete_order_ref = useRef(null);
	const decline_order_ref = useRef(null);
	const return_ref = useRef(null);

	const remarks_form_ref = useRef(null);
	const view_remarks_form_ref = useRef(null);

	const [allowed, setAllowed] = useState(true);

	const [declining, setDeclining] = useState(false);
	const { approvedRequisition, declineRequisition } = useRequisitions();
	const navigate = useNavigate();

	const { id } = useParams();

	const {
		data,
		loading: dataLoading,
		refreshData,
	} = useDataTable(`/inventory/requisition/${id}`, null);

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
				header: "Request qty",
				accessorKey: "request_quantity",
				className: "font-bold text-violet-600",
				cellClassName: "font-bold text-primary text-center",
				cell: ({ row }) => {
					return (
						<span className="text-primary">
							{row?.original?.request_quantity}
						</span>
					);
				},
			},
			{
				header: "In Stock Qty",
				accessorKey: "product.inventory.total_quantity",
				className: "",
				cellClassName: " text-center",
				cell: ({ row }) => {
					let val = row?.original?.inventory?.total_quantity;
					let isZeroOrLess = val <= 0;
					if (isZeroOrLess) {
						setAllowed(false);
					}
					return (
						<span
							className={`font-bold  ${isZeroOrLess ? "text-red-500" : "text-green-500"}`}
						>
							{val}
						</span>
					);
				},
			},
		],
		[],
	);

	useEffect(() => {
		console.log("data", data?.data?.details);
	}, [data?.data]);

	return (
		<AppLayout title="View request" backBtn>
			<div className="w-full">
				<div className="flex flex-col gap-y-6 pt-6">
					{/* 	<p className="text-sm text-dark">
						All ordered items will deliver by location
					</p> */}

					<RequestOrderCard data={data?.data} />

					{data?.data?.details?.map((detail) => (
						<CardLayout className="!p-0 !bg-background !shadow-sm">
							<div className="border-b px-4 py-6 flex flex-col lg:flex-row gap-4 items-center">
								<div className="text-lg font-light">
									<span>Order location:</span>
									<b> {detail.location.name}</b>
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
								data={detail.items}
								emptyMessage={`You don’t have an order`}
							/>
						</CardLayout>
					))}
				</div>
				{!allowed && (
					<p className="text-red-500 text-center pt-4 text-lg font-bold w-1/3 ml-auto">
						You cannot approve this request because one or more
						items have{" "}
						<u className="uppercase">insufficient stock quantity</u>
						.
					</p>
				)}
				<div
					className={`ml-auto flex items-start justify-end py-6  gap-4 w-full`}
				>
					{data?.data?.status == "pending" && (
						<>
							<Button
								className={`${!allowed ? "grayscale pointer-events-none" : ""}`}
								size="lg"
								type="accent"
								onClick={() => {
									complete_order_ref.current.show();
								}}
							>
								<FlatIcon icon="br-check" /> Approve Request
							</Button>

							<Button
								size="lg"
								type="danger"
								onClick={() => {
									decline_order_ref.current.show();
								}}
							>
								<FlatIcon icon="br-trash" /> Decline Request
							</Button>
						</>
					)}
				</div>
			</div>
			<AffirmationModal
				ref={decline_order_ref}
				title={`Decline request`}
				icon="br-cross"
				iconClassName="text-danger text-5xl"
				iconBorderColor="border-danger"
				titleColor="text-danger font-bolder uppercase text-xl"
				body={`Are you sure you want to decline this request?`}
				bodyClassName="!text-lg pb-4"
				footer={({ btnLoading, setBtnLoading }) => {
					return (
						<>
							<Button
								type="danger"
								loading={btnLoading}
								onClick={() => {
									setBtnLoading(true);
									declineRequisition(id)
										.then(() => {
											toast.success(
												"Request has been declined!",
											);
											setTimeout(() => {
												setBtnLoading(false);
												refreshData();
												decline_order_ref.current.hide();
											}, 1000);
										})
										.catch((err) => {
											console.log("errrr", err);
										})
										.finally(() => {
											setTimeout(() => {
												setBtnLoading(false);
											}, 1000);
										});
								}}
							>
								<FlatIcon icon="rr-check" className="mr-1" />{" "}
								Yes, decline request
							</Button>

							<Button
								type="transparent"
								onClick={() => {
									decline_order_ref.current.hide();
								}}
							>
								Maybe later
							</Button>
						</>
					);
				}}
				footerClassName="!items-center !justify-center"
			/>

			<AffirmationModal
				ref={complete_order_ref}
				title="Approve request"
				body="Are you sure you want to approve this request?"
				footer={({ btnLoading, setBtnLoading }) => {
					return (
						<>
							<Button
								type="accent"
								loading={btnLoading}
								onClick={() => {
									setBtnLoading(true);
									approvedRequisition(id).then(() => {
										toast.success(
											"Request has been approved successfully",
										);
										setTimeout(() => {
											setBtnLoading(false);
											complete_order_ref.current.hide();
											navigate(-1);
										}, 1000);
									});
								}}
							>
								<FlatIcon icon="rr-print" className="mr-1" />{" "}
								Yes, approve order
							</Button>

							<Button
								type="transparent"
								onClick={() => {
									complete_order_ref.current.hide();
								}}
							>
								Maybe later
							</Button>
						</>
					);
				}}
				footerClassName="!items-center !justify-center"
			/>
			<AffirmationModal
				ref={return_ref}
				title="Return items to requestor"
				body="Are you sure you want to return this Purchase Order lists?"
				footer={
					<>
						<Button
							type="accent"
							onClick={() => {
								toast.success(
									"Order has been returned successfully",
								);
								return_ref.current.hide();
							}}
						>
							<FlatIcon icon="rr-print" className="mr-1" /> Yes,
							return order
						</Button>

						<Button type="transparent">Maybe later</Button>
					</>
				}
				footerClassName="!items-center !justify-center"
			/>
			{/* view_remarks_form_ref */}
			<RemarksFormModal ref={remarks_form_ref} />
			<ViewRemarksModal
				ref={view_remarks_form_ref}
				remarks_form_ref={remarks_form_ref}
			/>
		</AppLayout>
	);
};

export default ViewRequestOrderPage;
