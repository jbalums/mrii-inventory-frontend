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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const IssuanceDetails = () => {
	const params = useParams();
	console.log("paramsss", params);
	const { user } = useAuth();
	const accept_order_ref = useRef(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [accepting, setAccepting] = useState(false);

	useEffect(() => {
		return () => {
			setTimeout(() => {
				setData(null);
			}, 100);
		};
	}, []);
	useEffect(() => {
		let t = setTimeout(() => {
			getOrderData();
		}, 500);
		return () => {
			clearTimeout(t);
		};
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
				className: "min-w-[44px] whitespace-pre",
				cellClassName: "min-w-[44px] whitespace-pre",
			},
		],
		[]
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
	return (
		<AppLayout
			icon={<FlatIcon icon="rr-document" />}
			title={loading ? "Loading..." : `View Request`}
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
								<span className="w-[128px]">Status:</span>
								<b className="break-all whitespace-normal">
									{requestOrderStatus[data?.status]}
								</b>
							</div>
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
											Pending for warehouse acceptance
										</i>
									)
								) : (
									""
								)}
								{data?.status == "accepted" ? (
									user?.data?.branch?.id == 1 ? (
										<Button
											type="primary"
											onClick={() => {
												accept_order_ref.current.show();
											}}
										>
											<FlatIcon icon="rr-layers" /> Create
											Issuance
										</Button>
									) : (
										<i className=" px-4 py-2 rounded-xl bg-primary text-white">
											Pending for warehouse acceptance
										</i>
									)
								) : (
									""
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
		</AppLayout>
	);
};

export default IssuanceDetails;
