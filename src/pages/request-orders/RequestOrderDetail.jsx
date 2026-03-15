import { useAuth } from "@/hooks/useAuth";
import { requestOrderStatus, purposeElements } from "@/libs/elementsHelper";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import CardLayout from "@/src/components/layout/CardLayout";
import AffirmationModal from "@/src/components/modals/AffirmationModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequisitions } from "../approving/hooks/useRequisitions";
import CreateIssuanceModal from "../issuances/components/CreateIssuanceModal";
import ReceiveOrderModal from "../issuances/components/ReceiveOrderModal";
import TestExport from "./TestExport";
import QRCode from "qrcode.react";
import OrderStatus from "@/src/components/OrderStatus";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import useRequestOrdersHook from "./hooks/useRequestOrdersHook";
import { requisitionsApi } from "@/src/services/api/requisitions";
import ViewProductModal from "../inventory/components/ViewProductModal";
import { v4 as uuidv4 } from "uuid";
import ViewInventoryTransactionsModal from "../inventory/components/ViewInventoryTransactionsModal";
import { Tooltip, Whisper } from "rsuite";
import EditRequestOrderModal from "./components/EditRequestOrderModal";
import SelectItemsModal from "@/src/components/items/SelectItemsModal";
import "rsuite/Tooltip/styles/index.css";

const RequestOrderDetail = () => {
	const params = useParams();
	const location = useLocation();
	const { origin } = window?.location || { origin: "" };

	const { user } = useAuth();
	const approve_order_ref = useRef(null);
	const decline_order_ref = useRef(null);
	const delete_order_ref = useRef(null);
	const approve_issuance_ref = useRef(null);
	const receive_order_ref = useRef(null);

	const correctInventoryRef = useRef(null);
	const accept_order_ref = useRef(null);
	const create_issuance_ref = useRef(null);

	const { approvedRequisition, declineRequisition, deleteRequisition } =
		useRequisitions();
	const { correctRequestOrder, getRequestOrderDetail } = useRequestOrdersHook();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [accepting, setAccepting] = useState(false);
	const [approving, setApproving] = useState(false);
	const [declining, setDeclining] = useState(false);
	const [correcting, setCorrecting] = useState(false);

	const [selectedItem, setSelectedItem] = useState(null);

	const viewProductRef = useRef(null);
	const editRequestModalRef = useRef(null);
	const select_items_ref = useRef(null);

	const [itemModalKey, setItemModalKey] = useState(uuidv4());
	useEffect(() => {
		getOrderData();
	}, [params.id]);
	const getOrderData = useCallback(() => {
		if (params.id) {
			setLoading(true);
			getRequestOrderDetail(params.id)
				.then((res) => {
					setData(res.data);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [getRequestOrderDetail, params?.id]);

	const viewProductModal = (item) => {
		console.log("itemitemitem", item);
		setItemModalKey(uuidv4());
		setTimeout(() => {
			viewProductRef.current.show({
				...item,
				product_id: item?.id,
				branch_id: data?.branch_id,
			});
		}, 100);
	};
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
		requisitionsApi
			.accept(params?.id)
			.then((res) => {
				setAccepting(false);
				toast.success("Order accepted successfully");
				accept_order_ref.current.hide();
				getOrderData();
			});
	}, [getOrderData, params?.id]);

	const approveIssuance = () => {
		return requisitionsApi.approveIssuance(params?.id);
	};

	const addToList = (item) => {
		console.log("addToList", item);
		// setList((list) => [item, ...list]);
	};

	const updateInList = (item) => {
		console.log("updateInList", item);
		// setList((list) => list.map((x) => (x.id == item.id ? item : x)));
	};

	return (
		<AppLayout
			icon={<FlatIcon icon="rr-document" />}
			title={loading ? "Loading..." : `Viewing request Ref# ${data?.ref}`}
			titleChildren={
				<>
					<span className="mr-auto"></span>

					{user?.data?.user_type == "admin" ? (
						<Button
							className="ml-auto px-6 font-bold hidden"
							type="primary"
							onClick={() => {
								editRequestModalRef.current.show(data);
							}}
						>
							<FlatIcon icon="rr-edit" /> Edit Request
						</Button>
					) : (
						""
					)}
					<Link
						className="ml-0"
						to={`/request-orders/${data?.id}/print`}
						target="_blank"
					>
						<Button
							className="ml-auto px-6 font-bold"
							type="secondary"
						>
							<FlatIcon icon="rr-print" /> Print/Download Request
						</Button>
					</Link>
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
			<div className="flex gap-6 flex-col lg:flex-row">
				<div className="w-full lg:w-1/3 grid grid-cols-1">
					<h3 className="mb-3">Request details</h3>
					{loading ? (
						<>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-4 py-2 whitespace-pre rounded-t-lg">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>
							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-1/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
								<span className="w-2/3 bg-background animate-pulse rounded-xl">
									&nbsp;
								</span>
							</div>

							<div className=" bg-[#f5f7ff] animate-pulse flex gap-2 px-4 py-2 whitespace-pre rounded-b-xl">
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
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 pt-4 whitespace-pre rounded-">
								<span className="w-[128px]">Purpose:</span>
								<b className="break-all whitespace-normal uppercase">
									{data?.purpose}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">Ref #:</span>
								<b className="break-all whitespace-normal">
									{data?.ref}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">Account code:</span>
								<b className="break-all whitespace-normal">
									{data?.account_code}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">Project code:</span>
								<b className="break-all whitespace-normal">
									{data?.project_code}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">
									Request Status:
								</span>
								<b className="break-all whitespace-normal uppercase">
									<OrderStatus status={data?.status} />
								</b>
							</div>

							{(isIssuance() ||
								(inReceiving() &&
									data?.status == "accepted" &&
									data?.issuance_status == "completed") ||
								(data?.status == "completed" &&
									data?.issuance_status == "completed")) && (
								<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
									<span className="w-[128px]">
										Issuance Status:
									</span>
									<b className="break-all whitespace-normal">
										{data?.issuance_status}
									</b>
								</div>
							)}
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">Date needed:</span>
								<b className="break-all whitespace-normal">
									{data?.date_needed}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">
									Date approved:
								</span>
								<b className="break-all whitespace-normal">
									{data?.date_approved || "-"}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">
									Date declined:
								</span>
								<b className="break-all whitespace-normal">
									{data?.date_declined || "-"}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">Date created:</span>
								<b className="break-all whitespace-normal">
									{data?.created_at}
								</b>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 py-2 whitespace-pre">
								<span className="w-[128px]">Requested by:</span>
								<div className="flex items-center gap-2">
									<b className="break-all whitespace-normal">
										{data?.requester?.name}
									</b>
								</div>
							</div>
							<div className=" bg-[#f5f7ff] flex gap-2 px-4 pt-2 pb-4 whitespace-pre flex-col ">
								{data?.status == "pending" ? (
									user?.data?.branch?.id ==
									data?.requester?.branch_id ? (
										<>
											<Button
												className="font-semibold text-lg"
												type="success"
												disabled={approving}
												loading={approving}
												onClick={() => {
													approve_order_ref.current.show();
												}}
											>
												{data?.purpose ==
												"finished_goods"
													? "Approve Request"
													: "Approve Request"}
											</Button>

											<Button
												className="font-semibold text-lg"
												type="danger"
												disabled={declining}
												loading={declining}
												onClick={() => {
													decline_order_ref.current.show();
												}}
											>
												{data?.purpose ==
												"finished_goods"
													? "Decline Request"
													: "Decline Request"}
											</Button>
										</>
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
					{user?.data?.user_type == "admin" ? (
						<>
							<div className="flex flex-col gap-0 items-center mt-4 justify-center py-4 px-4 bg-[#f5f7ff]">
								<span className="uppercase text-danger font-bold mb-4 text-center">
									NOTE: This action is irrevocable,
									<br />
									proceed with caution!
								</span>
								<Button
									className="w-full px-6 font-bold !bg-red-800 hover:cursor-pointer"
									type="danger"
									onClick={() => {
										delete_order_ref.current.show();
									}}
								>
									<FlatIcon icon="rr-trash" /> Delete Request
								</Button>
							</div>
						</>
					) : (
						""
					)}

					<h3 className="mt-6 mb-3">QR Code</h3>
					<div className="flex flex-col gap-0 items-center justify-center py-0 px-4 bg-[#f5f7ff]">
						<span className="text-transparent">{`${origin}/show-order/${data?.id}`}</span>
						<QRCode
							value={`${origin}/show-order/${data?.id}`}
							size={128}
						/>
						<span className="text-transparent">{`${origin}/show-order/${data?.id}`}</span>
					</div>
				</div>
				<div className="w-full lg:w-2/3 flex flex-col gap-4">
					<div className="w-full  flex flex-col">
						<div className="flex items-center gap-4 mb-3">
							<h3 className="">Requested items</h3>
							{
								(data?.status == 'pending' && data?.details?.length == 0 )? 
								(data?.requester?.id == user?.data?.id || user?.data?.user_type == "admin") ? 
								<Button
									className="ml-4 px-2 font-bold"
									type="accent"
									size="xs"
									onClick={() => {
										editRequestModalRef.current.show(data);
									}}
								>
									<FlatIcon icon="rr-plus" /> Add requested items
								</Button> : ''  : ''
							}
						</div>
						{loading ? (
							<div className="h-[88px] flex items-center justify-center !bg-white rounded-lg text-placeholder">
								Loading...
							</div>
						) : (
							<>
								{data?.details?.map((detail) => {
									return (
										<>
											<div className="table p-6 bg-[#f5f7ff] max-w-full overflow-auto">
												<table>
													<thead>
														<tr>
															<td
																className="!text-sm !text-left"
																colSpan={999}
															>
																Location:{" "}
																<b>
																	{
																		detail
																			?.location
																			?.name
																	}
																</b>
															</td>
														</tr>
														<tr className="divide-x">
															<th className="!text-sm !text-left !font-semibold hidden">
																ID
															</th>
															<th className="!text-sm !text-left !font-semibold">
																Code
															</th>
															<th className="!text-sm !text-left !font-semibold">
																Description
															</th>
															<th className="!text-sm !text-left !font-semibold">
																Item U/M
															</th>
															<th className="!text-sm !text-center !font-semibold">
																{data?.purpose ==
																"finished_goods"
																	? "Quantity"
																	: "Requested QTY"}
															</th>
															{data?.purpose ==
															"finished_goods" ? (
																""
															) : (
																<th className="!text-sm !text-center !font-semibold">
																	Issued QTY
																</th>
															)}
														</tr>
													</thead>
													<tbody>
														{detail?.items?.map(
															(item) => {
																return (
																	<tr
																		className="divide-x"
																		key={`tr-di-${item?.id}`}
																	>
																		<td className="!text-sm !text-left hidden">
																			{
																				item
																					?.product
																					?.id
																			}
																		</td>

																		<td className="!text-sm !text-left relative">
																			<span
																				className="bg-transparent h-1 w-1 absolute left-0 top-0 cursor-pointer"
																				onClick={() => {
																					setSelectedItem(
																						item
																					);
																					correctInventoryRef.current.show();
																				}}
																			></span>
																			{
																				item
																					?.product
																					?.code
																			}
																			{/* <Whisper
																				placement="top"
																				controlId="control-id-hover"
																				trigger="hover"
																				speaker={
																					<Tooltip>
																						Change
																						item
																					</Tooltip>
																				}
																			>
																				<span className="absolute p-1 right-0 top-0 cursor-pointer">
																					<FlatIcon
																						icon="rr-edit"
																						className="text-xs"
																					/>
																				</span>
																			</Whisper> */}
																		</td>
																		<td
																			className="!text-sm !text-left "
																			onClick={() =>
																				viewProductModal(
																					item?.product
																				)
																			}
																		>
																			{
																				item
																					?.product
																					?.name
																			}
																		</td>
																		<td className="!text-sm !text-left ">
																			{
																				item
																					?.product
																					?.unit_measurement
																			}
																		</td>
																		<td className="!text-sm !text-center  w-[44px]">
																			{
																				item?.request_quantity
																			}
																		</td>
																		{data?.purpose ==
																		"finished_goods" ? (
																			""
																		) : (
																			<td className="!text-sm !text-center  w-[44px]">
																				{
																					item?.full_filled_quantity
																				}
																			</td>
																		)}
																	</tr>
																);
															}
														)}
													</tbody>
												</table>
											</div>
										</>
									);
								})}
							</>
						)}
					</div>
				</div>
			</div>
			<AffirmationModal
				ref={approve_order_ref}
				title={`Approve request ${
					data?.purpose == "finished_goods" ? "and receive!" : ""
				}`}
				body={`Are you sure you want to approve this request ${
					data?.purpose == "finished_goods"
						? "and receive finish goods?"
						: "?"
				}`}
				footer={({ btnLoading, setBtnLoading }) => {
					return (
						<>
							<Button
								type="accent"
								loading={btnLoading}
								onClick={() => {
									setBtnLoading(true);
									setApproving(true);
									approvedRequisition(params?.id)
										.then(() => {
											toast.success(
												"Request has been approved successfully"
											);
											setTimeout(() => {
												setBtnLoading(false);
												setApproving(false);
												getOrderData();
												approve_order_ref.current.hide();
											}, 1000);
										})
										.catch((err) => {
											console.log("errrr", err);
										})
										.finally(() => {
											setTimeout(() => {
												setBtnLoading(false);
												setApproving(false);
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
									setDeclining(true);
									declineRequisition(params?.id)
										.then(() => {
											toast.success(
												"Request has been declined!"
											);
											setTimeout(() => {
												setBtnLoading(false);
												setDeclining(false);
												getOrderData();
												decline_order_ref.current.hide();
											}, 1000);
										})
										.catch((err) => {
											console.log("errrr", err);
										})
										.finally(() => {
											setTimeout(() => {
												setBtnLoading(false);
												setDeclining(false);
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
				ref={delete_order_ref}
				title={`Delete request`}
				icon="br-cross"
				iconClassName="text-danger text-5xl"
				iconBorderColor="border-danger"
				titleColor="text-danger font-bolder uppercase text-xl"
				body={
					<>
						<span className="text-base pb-5">
							Are you sure you want to DELETE this request?
						</span>
						<br />
						<br />
						<span className="text-red-600 uppercase font-bold text-sm">
							NOTE: This request and all transaction affected with
							this request will be removed and cannot be undone.
						</span>
					</>
				}
				bodyClassName="!text-lg pb-4"
				footer={({ btnLoading, setBtnLoading }) => {
					return (
						<>
							<Button
								type="danger"
								loading={btnLoading}
								onClick={() => {
									setBtnLoading(true);
									setDeclining(true);
									deleteRequisition(params?.id)
										.then(() => {
											toast.success(
												"Request has been deleted successfully!"
											);
											setTimeout(() => {
												setBtnLoading(false);
												setDeclining(false);
												window.location.pathname =
													"/request-orders";
											}, 1000);
										})
										.catch((err) => {
											console.log("errrr", err);
										})
										.finally(() => {
											setTimeout(() => {
												setBtnLoading(false);
												setDeclining(false);
											}, 1000);
										});
								}}
							>
								<FlatIcon icon="rr-check" className="mr-1" />{" "}
								Yes, delete request
							</Button>

							<Button
								className="ml-auto"
								type="transparent"
								onClick={() => {
									delete_order_ref.current.hide();
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

			<ConfirmModal
				ref={correctInventoryRef}
				title="Correct Inventory"
				body={
					<>
						<div className="table">
							<table className="table">
								<tbody>
									<tr>
										<td>REF #</td>
										<th>{data?.ref}</th>
										<td>Purpose: </td>
										<th>{data?.purpose}</th>
									</tr>
									<tr>
										<td>Product ID</td>
										<th>{selectedItem?.product?.id}</th>
									</tr>
									<tr>
										<td>Product Name</td>
										<th colSpan={3}>
											{selectedItem?.product?.name}
										</th>
									</tr>
									<tr>
										<td>Product Code</td>
										<th colSpan={3}>
											{selectedItem?.product?.code}
										</th>
									</tr>
									<tr>
										<td>Qty</td>
										<th colSpan={3}>
											{selectedItem?.request_quantity}
										</th>
									</tr>
								</tbody>
							</table>
						</div>
					</>
				}
				footer={
					<Button
						type="success"
						className={`ml-4 font-bold`}
						onClick={() => {
							let movement = "in";
							if (
								data?.purpose == "sale" ||
								data?.purpose == "internal_use"
							) {
								movement = "out";
							}
							setCorrecting(true);
							correctRequestOrder({
								product_id: selectedItem?.product?.id,
								qty: selectedItem?.request_quantity,
								id: data?.id,
								movement: movement,
							}).then((res) => {
								setCorrecting(false);
								toast.success(
									"Inventory corrected successfully"
								);
								correctInventoryRef.current.hide();
							});
						}}
						loading={correcting}
						loadingMessage="Loading... please wait..."
					>
						SUBMIT
					</Button>
				}
			/>

			<ViewInventoryTransactionsModal
				key={itemModalKey}
				ref={viewProductRef}
			/>
			<EditRequestOrderModal
				addToList={addToList}
				updateInList={updateInList}
				ref={editRequestModalRef}
				select_items_ref={select_items_ref}
			/>

			<SelectItemsModal
				ref={select_items_ref}
				url={`/inventory`}
				defaultFilter={{
					request_order: "yes",
					location_id: user?.data?.branch_id,
				}}
			/>
		</AppLayout>
	);
};

export default RequestOrderDetail;
