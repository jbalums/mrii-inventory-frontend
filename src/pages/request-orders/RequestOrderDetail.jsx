import { useAuth } from "@/hooks/useAuth";
import axios from "@/libs/axios";
import { requestOrderStatus, purposeElements } from "@/libs/elementsHelper";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import CardLayout from "@/src/components/layout/CardLayout";
import AffirmationModal from "@/src/components/modals/AffirmationModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequisitions } from "../approving/hooks/useRequisitions";
import CreateIssuanceModal from "../issuances/components/CreateIssuanceModal";
import ReceiveOrderModal from "../issuances/components/ReceiveOrderModal";
import TestExport from "./TestExport";

const RequestOrderDetail = () => {
	const params = useParams();
	const location = useLocation();
	console.log("paramsss", location);

	const { user } = useAuth();
	const approve_order_ref = useRef(null);
	const approve_issuance_ref = useRef(null);
	const receive_order_ref = useRef(null);

	const accept_order_ref = useRef(null);
	const create_issuance_ref = useRef(null);

	const { approvedRequisition } = useRequisitions();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [accepting, setAccepting] = useState(false);
	const [approving, setApproving] = useState(false);

	useEffect(() => {
		getOrderData();
	}, [params.id]);
	const getOrderData = useCallback(() => {
		if (params.id) {
			setLoading(true);
			axios.get(`/inventory/requisition/${params.id}`).then((res) => {
				setData(res.data.data);
				setLoading(false);
			});
		}
	}, [params?.id]);

	const forApproval = () => {
		return (
			location.pathname.includes("/for-approval-issuances") &&
			data?.status == "pending_approval"
		);
	};
	const isIssuance = () => {
		return location.pathname.includes("issuance");
	};
	const inReceiving = useCallback(() => {
		return location.pathname.includes("receiving-orders");
	}, [params?.id]);

	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "product.code",
				className: "min-w-[108px] whitespace-pre",
				cellClassName: "min-w-[108px] whitespace-pre",
			},
			{
				header: "Name",
				accessorKey: "product.name",
				className: " !font-bold min-w-[144px] whitespace-pre",
				cellClassName: " min-w-[144px] whitespace-pre",
			},
			{
				header: "UoM",
				accessorKey: "product.uom",
				className: "min-w-[64px] whitespace-pre",
				cellClassName: "min-w-[64px] whitespace-pre",
			},
			{
				header: "Request qty",
				accessorKey: "request_quantity",
				className: " min-w-[44px] whitespace-pre text-center",
				cellClassName: " min-w-[44px] whitespace-pre text-center",
				thClassName: " !text-center",
			},
			{
				header: "Issued qty",
				accessorKey: "full_filled_quantity",
				className: ` min-w-[44px] !text-indigo-500 font-bold text-center whitespace-pre ${
					isIssuance() ||
					(inReceiving() &&
						data?.status == "accepted" &&
						data?.issuance_status == "completed") ||
					(data?.status == "completed" &&
						data?.issuance_status == "completed")
						? ""
						: "hidden"
				}`,
				cellClassName: ` min-w-[44px] !text-indigo-500 font-bold text-center whitespace-pre ${
					isIssuance() ||
					(inReceiving() &&
						data?.status == "accepted" &&
						data?.issuance_status == "completed") ||
					(data?.status == "completed" &&
						data?.issuance_status == "completed")
						? ""
						: "hidden"
				}`,
				thClassName: " !text-center",
			},
			{
				header: "Received qty",
				accessorKey: "full_filled_quantity",
				id: "completed",
				className: ` min-w-[44px] !text-green-500 font-bold text-center whitespace-pre ${
					data?.status == "completed" &&
					data?.issuance_status == "completed"
						? ""
						: "hidden"
				}`,
				cellClassName: ` min-w-[44px] !text-green-500 font-bold text-center whitespace-pre ${
					data?.status == "completed" &&
					data?.issuance_status == "completed"
						? ""
						: "hidden"
				}`,
				thClassName: " !text-center",
			},
		],
		[data?.status, data?.issuance_status]
	);

	const acceptRequest = useCallback(() => {
		setAccepting(true);
		axios
			.post(`/inventory/requisition-accept/${params?.id}`)
			.then((res) => {
				setAccepting(false);
				toast.success("Order accepted successfully");
				accept_order_ref.current.hide();
				getOrderData();
			});
	}, [params?.id]);

	const approveIssuance = () => {
		return axios.post(`/inventory/issuance-approve/${params?.id}`);
	};

	return (
		<AppLayout
			icon={<FlatIcon icon="rr-document" />}
			title={loading ? "Loading..." : `Viewing request Ref# ${data?.ref}`}
			titleChildren={
				<>
					<Button className="ml-auto px-6 font-bold" type="secondary">
						<FlatIcon icon="rr-print" /> Print Request
					</Button>
					<Button className="ml-4 px-6 font-bold" type="primary">
						<FlatIcon icon="rr-print" /> Print QR
					</Button>
					<TestExport />
				</>
			}
			breadcrumbs={[
				{
					to: "/request-orders",
					icon: "rr-inbox-in",
					label: "Request orders",
				},
			]}
		>
			{console.log(
				"data?.status,data?.issuance_status",
				data?.status,
				data?.issuance_status
			)}
			<div className="flex gap-6 flex-col lg:flex-row">
				<div className="w-full lg:w-1/3 grid grid-cols-1">
					<h3 className="mb-3">Request details</h3>
					{loading ? (
						<>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-2 py-2 whitespace-pre rounded-t-lg">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>

							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-2 py-2 whitespace-pre rounded-b-xl">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
						</>
					) : (
						<>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre rounded-t-xl">
								<span className="w-[128px]">Purpose:</span>
								<b className="break-all whitespace-normal uppercase">
									{data?.purpose}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-[128px]">Ref #:</span>
								<b className="break-all whitespace-normal">
									{data?.ref}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-[128px]">Account code:</span>
								<b className="break-all whitespace-normal">
									{data?.account_code}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-[128px]">Project code:</span>
								<b className="break-all whitespace-normal">
									{data?.project_code}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-[128px]">
									Request Status:
								</span>
								<b className="break-all whitespace-normal">
									{data?.status}
								</b>
							</div>

							{(isIssuance() ||
								(inReceiving() &&
									data?.status == "accepted" &&
									data?.issuance_status == "completed") ||
								(data?.status == "completed" &&
									data?.issuance_status == "completed")) && (
								<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
									<span className="w-[128px]">
										Issuance Status:
									</span>
									<b className="break-all whitespace-normal">
										{data?.issuance_status}
									</b>
								</div>
							)}
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-[128px]">Date needed:</span>
								<b className="break-all whitespace-normal">
									{data?.date_needed}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-[128px]">
									Date approved:
								</span>
								<b className="break-all whitespace-normal">
									{data?.date_approved || "-"}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-[128px]">Date created:</span>
								<b className="break-all whitespace-normal">
									{data?.created_at}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 py-2 whitespace-pre">
								<span className="w-[128px]">Requested by:</span>
								<div className="flex items-center gap-2">
									<b className="break-all whitespace-normal">
										{data?.requester?.name}
									</b>
								</div>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-2 pt-2 pb-4 whitespace-pre flex-col rounded-b-xl">
								{data?.status == "pending" ? (
									user?.data?.branch?.id ==
									data?.requester?.branch_id ? (
										<Button
											type="success"
											onClick={() => {
												approve_order_ref.current.show();
											}}
										>
											Approve Request
										</Button>
									) : (
										""
									)
								) : (
									""
								)}
								{data?.status == "approved" ? (
									user?.data?.branch?.id == 1 ? (
										<Button
											type="success"
											onClick={() => {
												accept_order_ref.current.show();
											}}
										>
											Accept Request
										</Button>
									) : (
										<i className=" px-4 py-2 rounded-xl bg-primary text-white">
											Pending for main warehouse request
											acceptance
										</i>
									)
								) : (
									""
								)}
								{data?.issuance_status != "completed" &&
								data?.status == "accepted" &&
								isIssuance() ? (
									user?.data?.branch?.id == 1 ? (
										<Button
											type="primary"
											onClick={() => {
												create_issuance_ref.current.show(
													data
												);
											}}
										>
											<FlatIcon icon="rr-layers" /> Create
											Issuance
										</Button>
									) : (
										<i className=" px-4 py-2 rounded-xl bg-primary text-white">
											Pending for issuance approval
										</i>
									)
								) : (
									""
								)}
								{forApproval() && (
									<Button
										size="lg"
										type="accent"
										onClick={() => {
											approve_issuance_ref.current.show();
										}}
									>
										<FlatIcon icon="rr-check" /> Approve
										Issuance
									</Button>
								)}
								{isIssuance() &&
								data?.issuance_status == "completed" &&
								data?.status == "accepted" ? (
									<i className=" px-4 py-2 rounded-xl bg-warning text-center text-white">
										Pending for warehouse receiving order.
									</i>
								) : (
									""
								)}
								{inReceiving() &&
									data?.status == "accepted" &&
									data?.issuance_status == "completed" && (
										<Button
											size="lg"
											type="accent"
											onClick={() => {
												receive_order_ref.current.show(
													data
												);
											}}
										>
											<FlatIcon icon="rr-check" /> Receive
											Order
										</Button>
									)}
							</div>
						</>
					)}
					{/* 				account_code date_needed date_approved created_at project_code
				purpose requester status */}
				</div>
				<div className="w-full lg:w-2/3 flex flex-col gap-4">
					<h3>Request items</h3>
					{loading ? (
						<span className="p-4 !bg-background rounded-lg text-placeholder">
							Loading...
						</span>
					) : (
						<>
							{data?.details?.map((detail) => {
								return (
									<CardLayout className="!p-0 !bg-background !shadow-sm pb-2">
										<div className="flex items-center gap-2 px-2 pt-4 pb-2 border-b">
											<span>Location: </span>
											<b>{detail?.location?.name}</b>
										</div>
										<div className="w-full overflow-auto">
											<Table
												rowClick={(data) => {}}
												columns={columns}
												pagination={false}
												loading={loading}
												data={detail?.items || []}
												emptyMessage={`You don’t have an order`}
											/>
										</div>
									</CardLayout>
								);
							})}
						</>
					)}
				</div>
			</div>
			<AffirmationModal
				ref={approve_order_ref}
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
									approvedRequisition(params?.id).then(() => {
										toast.success(
											"Request has been approved successfully"
										);
										setTimeout(() => {
											setBtnLoading(false);
											getOrderData();
											approve_order_ref.current.hide();
										}, 1000);
									});
								}}
							>
								<FlatIcon icon="rr-check" className="mr-1" />{" "}
								Yes, approve request
							</Button>

							<Button
								type="transparent"
								onClick={() => {
									approve_order_ref.current.hide();
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
				ref={approve_issuance_ref}
				title="Approve Issuance"
				body={
					<p>
						Are you sure you want to approve this issuance? <br />{" "}
						This could also mean that the request is in <br />{" "}
						<b className="text-green-800">transit</b> or in{" "}
						<b className="text-green-800">delivery</b>.
					</p>
				}
				footer={({ btnLoading, setBtnLoading }) => {
					return (
						<>
							<Button
								type="accent"
								loading={btnLoading}
								onClick={() => {
									setBtnLoading(true);
									approveIssuance(params?.id).then(() => {
										toast.success(
											"Issuance has been approved successfully"
										);
										setTimeout(() => {
											setBtnLoading(false);
											approve_issuance_ref.current.hide();
										}, 1000);
									});
								}}
							>
								<FlatIcon icon="rr-check" className="mr-1" />{" "}
								Yes, approve issuance
							</Button>

							<Button
								type="transparent"
								onClick={() => {
									approve_issuance_ref.current.hide();
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
				ref={accept_order_ref}
				title="Accept request"
				body="Are you sure you want to accept the request?"
				footer={
					<>
						<Button
							type="success"
							loading={accepting}
							onClick={() => {
								acceptRequest();
							}}
						>
							<FlatIcon icon="rr-check" className="mr-1" /> Yes,
							Accept request
						</Button>

						<Button
							type="transparent"
							disabled={accepting}
							onClick={() => {
								accept_order_ref.current.hide();
							}}
						>
							Maybe later
						</Button>
					</>
				}
				footerClassName="!items-center !justify-center"
			/>
			<CreateIssuanceModal
				ref={create_issuance_ref}
				getOrderData={getOrderData}
			/>
			<ReceiveOrderModal
				ref={receive_order_ref}
				getOrderData={getOrderData}
			/>
		</AppLayout>
	);
};

export default RequestOrderDetail;
