import axios from "@/libs/axios";
import FlatIcon from "@/src/components/FlatIcon";
import CardLayout from "@/src/components/layout/CardLayout";
import Table from "@/src/components/table/Table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PublicAppLayout from "../components/PublicAppLayout";

const ShowRequestOrder = () => {
	const params = useParams();
	const location = useLocation();
	console.log("paramsss", location);

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getOrderData();
	}, [params.id]);
	const getOrderData = useCallback(() => {
		if (params.id) {
			setLoading(true);
			axios.get(`/public/requisition/${params.id}`).then((res) => {
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

	return (
		<PublicAppLayout
			icon={<FlatIcon icon="rr-document" />}
			title={loading ? "Loading..." : `Viewing request Ref# ${data?.ref}`}
			titleChildren={<></>}
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
						</>
					)}
				</div>
				<div className="w-full lg:w-2/3 flex flex-col gap-4">
					<div className="w-full ">
						<h3 className="text- mb-3">Requested items</h3>
						{loading ? (
							<div className="h-[88px] flex items-center justify-center !bg-white rounded-lg text-placeholder">
								Loading...
							</div>
						) : (
							<>
								{data?.details?.map((detail) => {
									return (
										<div className="w-full max-w-full overflow-auto">
											<div className="table p-6 bg-[#f5f7ff]">
												<table className="min-w-[512px]">
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
																Requested QTY
															</th>
															<th className="!text-sm !text-center !font-semibold">
																Issued QTY
															</th>
														</tr>
													</thead>
													<tbody>
														{detail?.items?.map(
															(item) => {
																return (
																	<tr className="divide-x">
																		<td className="!text-sm !text-left ">
																			{
																				item
																					?.product
																					?.code
																			}
																		</td>
																		<td className="!text-sm !text-left ">
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
																		<td className="!text-sm !text-center  w-[44px]">
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
										</div>
									);
								})}
							</>
						)}
					</div>
				</div>
			</div>
		</PublicAppLayout>
	);
};

export default ShowRequestOrder;
