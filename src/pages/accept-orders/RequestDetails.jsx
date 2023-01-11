import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import CardLayout from "@/src/components/layout/CardLayout";
import AffirmationModal from "@/src/components/modals/AffirmationModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import axios from "@/libs/axios.js";
import { useRef } from "react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CreateIssuanceModal from "./components/CreateIssuanceModal";
import AddToReOrderModal from "./components/AddToReOrderModal";

const RequestDetails = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [request, setRequest] = useState(null);
	const [accepted, setAccepted] = useState(false);
	const [loading, setLoading] = useState(false);
	const accept_modal_ref = useRef(null);
	const issuance_modal = useRef(null);
	const add_to_reorder_ref = useRef(null);

	/* 
	{
			code: "AG454",
			name: "Percal",
			location: "Cebu",
			uom: "20 KG",
			qty_on_hand: "0",
			qty_to_order: "123",
			stock_level: "available",
		}, */
	const [list, setList] = useState([]);

	useEffect(() => {
		console.log("paramsparams", params);
		setLoading(true);
		getRequestData();
	}, []);
	const getRequestData = () => {
		axios
			.get(`/inventory/request/${params?.id}`)
			.then((res) => {
				console.log("res.data", res.data);
				setRequest(res.data.data);
				setList(res.data.data?.items || []);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const renderStockLevel = (level) => {
		switch (level) {
			case "available":
				return (
					<div className="px-2 bg-success bg-opacity-10 text-success rounded-xl text-center w-[120px]">
						Stock available
					</div>
				);
			case "empty":
				return (
					<div className="px-2 bg-danger bg-opacity-10 text-danger rounded-xl text-center w-[120px]">
						Empty stock
					</div>
				);
			case "low":
				return (
					<div className="px-2 bg-warning bg-opacity-10 text-warning rounded-xl text-center w-[120px]">
						Low stock
					</div>
				);

			default:
				return "";
		}
	};
	const columns = useMemo(() => [
		{
			header: "Code",
			accessorKey: "product.code",
			className: "",
			cellClassName: "",
		},
		{
			header: "Name",
			accessorKey: "product.name",
			className: "",
			cellClassName: "",
		},
		{
			header: "UoM",
			accessorKey: "product.unit_measurement",
			className: "",
			cellClassName: "",
		},

		{
			header: "QTY to order",
			accessorKey: "request_quantity",
			className: "text-left",
			cellClassName: "justify-center text-left",
		},
		/* 	{
			header: "Stock level",
			accessorKey: "stock_level",
			className: "text-center items-center justify-center flex",
			cellClassName: "",
			cell: ({ row }) => {
				const original = row?.original;
				return renderStockLevel(original?.stock_level);
			},
		}, */
		{
			header: " ",
			accessorKey: "stock_level",
			className: "text-center",
			cellClassName: "",
			cell: ({ row }) => {
				const original = row?.original;
				return original?.stock_level == "empty" ||
					original?.stock_level == "low" ? (
					<span className="text-accent cursor-pointer">
						Added to reorder
					</span>
				) : (
					""
				);
			},
		},
	]);
	return (
		<AppLayout
			backBtn
			title="Request information"
			titleChildren={
				accepted ? (
					<Button
						type="accent"
						className="ml-auto"
						onClick={() => {
							issuance_modal.current.show(list);
						}}
					>
						<FlatIcon icon="rs-plus" className="mr-2" />
						Create request issuance
					</Button>
				) : (
					<Button
						type="accent"
						className="ml-auto"
						onClick={() => {
							accept_modal_ref.current.show();
						}}
					>
						<FlatIcon icon="rs-plus" className="mr-2" />
						Accept request
					</Button>
				)
			}
		>
			<div className="w-full">
				{console.log("requestrequest", request)}
				<CardLayout className="!p-4 !bg-background mb-6 !shadow-sm">
					<h4 className="text-base font-bold mb-4">
						Requests details
					</h4>
					<div className="grid grid-cols-12 pb-2">
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Project Code
							</h5>
							<span className="text-sm">
								{request?.requisition?.project_code}
							</span>
						</div>
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Requestor name
							</h5>
							<span className="text-sm">
								{request?.requisition?.requester?.name}
							</span>
						</div>
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">Division</h5>
							<span className="text-sm">
								{request?.requisition?.requester?.name}
							</span>
						</div>
						<div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Date needed
							</h5>
							<span className="text-sm">
								{request?.requisition?.date_needed}
							</span>
						</div>
						{/* <div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Approve by
							</h5>
							<span className="text-sm">Ariel Mann</span>
						</div> */}
					</div>
				</CardLayout>
				<CardLayout className="!p-4 !bg-background mb-6 !shadow-sm">
					<div className="flex items-center">
						<h4 className="text-lg font-bold">Ordered Items</h4>
						{accepted && (
							<Button
								className="ml-auto"
								onClick={(e) => {
									add_to_reorder_ref.current.show(list);
								}}
							>
								<FlatIcon icon="rr-book" className="mr-2" />
								Items to reorder
								<span className="px-2 ml-2 text-sm text-center bg-foreground text-dark rounded-lg w-[44px]">
									2
								</span>
							</Button>
						)}
					</div>

					<Table
						columns={columns}
						loading={loading}
						data={list}
						emptyMessage={`You don’t have an order`}
					/>
				</CardLayout>
			</div>
			<AffirmationModal
				ref={accept_modal_ref}
				title="Accept request"
				body="Are you sure you want to accept the request?"
				footer={
					<>
						<Button
							type="accent"
							onClick={() => {
								// approvedRequisition(id).then(() => {
								setAccepted(true);
								toast.success(
									"Request has been accepted successfully"
								);
								accept_modal_ref.current.hide();
								// });
							}}
						>
							<FlatIcon icon="rr-print" className="mr-1" /> Yes,
							Accept
						</Button>

						<Button
							type="transparent"
							onClick={() => {
								accept_modal_ref.current.hide();
							}}
						>
							Maybe later
						</Button>
					</>
				}
				footerClassName="!items-center !justify-center"
			/>
			<CreateIssuanceModal ref={issuance_modal} />
			<AddToReOrderModal ref={add_to_reorder_ref} />
		</AppLayout>
	);
};

export default RequestDetails;
