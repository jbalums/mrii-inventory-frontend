import { mobileNumber } from "@/libs/helpers";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import CardLayout from "@/src/components/layout/CardLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import PrintableLayout from "@/src/components/layout/PrintableLayout";
import PrintableTable from "@/src/components/table/PrintableTable";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useCallback, useEffect, useMemo } from "react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import Pdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import axios from "@/libs/axios";
import PrintAppLayout from "@/src/components/PrintAppLayout";
import { toast } from "react-toastify";
const PrintRequestOrder = () => {
	const componentRef = useRef(null);

	const params = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		getOrderData();
	}, [params.id]);
	const getOrderData = useCallback(() => {
		if (params.id) {
			setLoading(true);
			axios.get(`inventory/requisition/${params.id}`).then((res) => {
				setData(res.data.data);
				setLoading(false);
			});
		}
	}, [params?.id]);

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

	useEffect(() => {}, []);
	return (
		<PrintAppLayout containerClassName={`!p-0`} backBtn>
			<div className="w-full py-5 bg-slate-700">
				<div className="flex items-center justify-end ml-auto gap-4 w-[8.5in] mx-auto">
					<Pdf
						options={{
							unit: "in",
							format: [8.5, 11],
						}}
						targetRef={componentRef.current}
						filename={`request-order-${data?.account_code}.pdf`}
						onComplete={() => {
							toast.success("PDF export success!");
						}}
					>
						{({ toPdf }) => (
							<Button
								className="gap-2 !rounded font-normal shadow-lg"
								type="background"
								onClick={toPdf}
								loading={loading}
							>
								<FlatIcon
									icon="rr-download"
									className="text-xs"
								/>{" "}
								Save as PDF
							</Button>
						)}
					</Pdf>
					<ReactToPrint
						trigger={() => (
							<Button
								className="gap-2 !rounded font-normal shadow-lg"
								type="background"
								loading={loading}
							>
								<FlatIcon icon="rr-print" /> Print document
							</Button>
						)}
						content={() => componentRef.current}
					/>
				</div>
			</div>
			<PrintableLayout
				ref={componentRef}
				className={``}
				title="Request Order"
			>
				<div className="absolute top-[0.4in] right-[0.4in]">
					{data?.id && (
						<QRCode
							value={`${origin}/show-order/${data?.id}`}
							size={108}
						/>
					)}
				</div>
				<div className="flex gap-6 flex-col ">
					<div className="w-full ">
						<h3 className="mb-2 text-sm">Request details</h3>
						{loading ? (
							<>
								<div className=" bg-[#f5f7ff] opacity-50 animate-pulse flex gap-2 px-2 py-2 whitespace-pre rounded-t-lg h-[144px]">
									<span className="w-1/3 bg-background animate-pulse rounded-xl">
										&nbsp;
									</span>
									<span className="w-2/3 bg-background animate-pulse rounded-xl">
										&nbsp;
									</span>
								</div>
							</>
						) : (
							<div className="printable-table">
								<table className="">
									<tbody>
										<tr>
											<th className="!text-[8pt] !text-left !font-semibold w-[128px]">
												Purpose:
											</th>
											<td className="!text-[8pt] !text-left capitalize">
												{data?.purpose}
											</td>
											<th className="!text-[8pt] !text-left !font-semibold w-[128px]">
												Account code:
											</th>
											<td className="!text-[8pt] !text-left">
												{data?.account_code}
											</td>
										</tr>
										<tr>
											<th className="!text-[8pt] !text-left !font-semibold w-[128px]">
												Project code:
											</th>
											<td className="!text-[8pt] !text-left">
												{data?.project_code}
											</td>
											<th className="!text-[8pt] !text-left !font-semibold w-[188px]">
												Request Status:
											</th>
											<td className="!text-[8pt] !text-left">
												{data?.status}
											</td>
										</tr>
										<tr>
											<th className="!text-[8pt] !text-left !font-semibold w-[128px]">
												Date needed:
											</th>
											<td className="!text-[8pt] !text-left">
												{data?.date_needed}
											</td>
											<th className="!text-[8pt] !text-left !font-semibold w-[188px]">
												Date approved:
											</th>
											<td className="!text-[8pt] !text-left">
												{data?.date_approved || "-"}
											</td>
										</tr>
										<tr>
											<th className="!text-[8pt] !text-left !font-semibold w-[128px]">
												Date created:
											</th>
											<td className="!text-[8pt] !text-left">
												{data?.created_at}
											</td>
											<th className="!text-[8pt] !text-left !font-semibold w-[188px]">
												Requested by:
											</th>
											<td className="!text-[8pt] !text-left">
												{data?.requester?.name}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
						{/* 				account_code date_needed date_approved created_at project_code
				purpose requester status */}
					</div>
					<div className="w-full  flex flex-col">
						<h3 className="text-sm mb-2">Requested items</h3>
						{loading ? (
							<div className="h-[88px] flex items-center justify-center !bg-white rounded-lg text-placeholder">
								Loading...
							</div>
						) : (
							<>
								{data?.details?.map((detail) => {
									return (
										<>
											<div className="printable-table">
												<table>
													<thead>
														<tr>
															<td
																className="!text-[8pt] !text-left"
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
														<tr>
															<th className="!text-[8pt] !text-left !font-semibold">
																Code
															</th>
															<th className="!text-[8pt] !text-left !font-semibold">
																Description
															</th>
															<th className="!text-[8pt] !text-left !font-semibold">
																Item U/M
															</th>
															<th className="!text-xs !text-center !font-semibold">
																Requested QTY
															</th>
															<th className="!text-xs !text-center !font-semibold">
																Issued QTY
															</th>
														</tr>
													</thead>
													<tbody>
														{detail?.items?.map(
															(item) => {
																return (
																	<tr>
																		<td className="!text-[8pt] !text-left ">
																			{
																				item
																					?.product
																					?.code
																			}
																		</td>
																		<td className="!text-[8pt] !text-left ">
																			{
																				item
																					?.product
																					?.name
																			}
																		</td>
																		<td className="!text-[8pt] !text-left ">
																			{
																				item
																					?.product
																					?.unit_measurement
																			}
																		</td>
																		<td className="!text-[8pt] !text-center  w-[44px]">
																			{
																				item?.request_quantity
																			}
																		</td>
																		<td className="!text-[8pt] !text-center  w-[44px]">
																			{
																				item?.full_filled_quantity
																			}
																		</td>
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
			</PrintableLayout>
		</PrintAppLayout>
	);
};

export default PrintRequestOrder;
