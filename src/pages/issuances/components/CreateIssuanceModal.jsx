import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextAreaInputField from "@/src/components/forms/TextAreaInputField";
import { requestOrderStatus, purposeElements } from "@/libs/elementsHelper";
import Infotext from "@/src/components/InfoText";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import CardLayout from "@/src/components/layout/CardLayout";
import axios from "@/libs/axios";
import { toast } from "react-toastify";

const CreateIssuanceModal = (props, ref) => {
	const { getOrderData } = props;
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (showData) => {
		setData(showData);
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
		setData(null);
	};

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
				accessorKey: "product.unit_measurement",
				className: "min-w-[64px] whitespace-pre",
				cellClassName: "min-w-[64px] whitespace-pre",
			},
			{
				header: "Request qty",
				accessorKey: "request_quantity",
				disabledSort: true,
				sortable: false,
				className: "min-w-[44px] whitespace-pre text-center",
				cellClassName: "min-w-[44px] whitespace-pre text-center",
				thClassName: "items-center justify-center !text-center",
			},
			{
				header: "Issued qty",
				accessorKey: "request_quantity",
				disabledSort: true,
				sortable: false,
				className: "min-w-[128px] whitespace-pre text-center",
				cellClassName: "min-w-[128px] whitespace-pre text-center",
				thClassName: "items-center justify-center !text-center",
				cell: (data) => {
					console.log("getValuegetValue", data?.getValue());
					return (
						<>
							<input
								type="number"
								onChange={(e) => {
									updateIssuedQty(
										data?.row?.original?.id,
										e.target.value
									);
								}}
								max={data?.getValue()}
								className="px-2 py-1 rounded-lg w-[112px] text-center border border-border"
								placeholder="Issued qty"
							/>
						</>
					);
				},
			},
		],
		[]
	);

	const updateIssuedQty = (id, issuedQty) => {
		setData((prevData) => ({
			...prevData,
			details: prevData?.details.map((prevDetail) => ({
				...prevDetail,
				items: prevDetail?.items?.map((x) =>
					x.id == id ? { ...x, issued_qty: issuedQty } : x
				),
			})),
		}));
	};

	const submitIssuanceForm = () => {
		setLoading(true);
		let formData = new FormData();

		data?.details?.map((detail) => {
			formData.append("requisition_detail_id[]", detail?.id);
			detail?.items.map((item) => {
				formData.append(
					`issued_qty[${detail?.id}][${item?.id}]`,
					item?.issued_qty
				);
			});
		});
		axios.post(`/inventory/issuances/${data?.id}`, formData).then((res) => {
			setLoading(false);
			setTimeout(() => {
				toast.success(
					"Issuance submitted successfully, and pending for approval!"
				);
				getOrderData();
			}, 200);
			hide();
		});
	};
	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader title={"Create issuance form"} hide={hide} />
			<ModalBody className={`!bg-[#f5f7ff]`}>
				<div className="flex gap-6 lg:gap-0 flex-col lg:flex-row">
					<div className="w-full lg:w-1/4 grid grid-cols-1 text-sm border">
						<div className="  flex flex-col gap-1 px-2 py-1 whitespace-pre mb-3  border-b">
							<h3 className="text-primary">Request details</h3>
						</div>
						<div className="  flex flex-col gap-1 px-2 py-1 whitespace-pre rounded-t-xl">
							<span className="w-[128px]">Purpose:</span>
							<b className="break-all whitespace-normal uppercase">
								{data?.purpose}
							</b>
						</div>
						<div className="  flex flex-col gap-1 px-2 py-1 whitespace-pre">
							<span className="w-[128px]">Ref #:</span>
							<b className="break-all whitespace-normal">
								{data?.ref}
							</b>
						</div>
						<div className="  flex flex-col gap-1 px-2 py-1 whitespace-pre">
							<span className="w-[128px]">Account code:</span>
							<b className="break-all whitespace-normal">
								{data?.account_code}
							</b>
						</div>
						<div className="  flex flex-col gap-1 px-2 py-1 whitespace-pre">
							<span className="w-[128px]">Project code:</span>
							<b className="break-all whitespace-normal">
								{data?.project_code}
							</b>
						</div>
						<div className="  flex flex-col gap-1 px-2 py-1 whitespace-pre">
							<span className="w-[128px]">Status:</span>
							<b className="break-all whitespace-normal">
								{data?.status}
							</b>
						</div>
						<div className="  flex flex-col gap-1 px-2 py-1 whitespace-pre rounded-b-xl">
							<span className="w-[128px]">Requested by:</span>
							<div className="flex items-center gap-2">
								<b className="break-all whitespace-normal">
									{data?.requester?.name}
								</b>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-3/4 flex flex-col gap-4 border-r border-b">
						<div className="  flex flex-col gap-1 px-2 py-1 whitespace-pre border-b border-y border-r">
							<h3 className="text-primary">Request items</h3>
						</div>
						{data?.details?.map((detail) => {
							return (
								<CardLayout className="!p-0 !bg-background !shadow-sm pb-2">
									<div className="flex items-center gap-2 px-2 pb-2 border-b">
										<span>Location: </span>
										<b>{detail?.location?.name}</b>
									</div>
									<div className="w-full overflow-auto">
										<Table
											rowClick={(data) => {}}
											columns={columns}
											pagination={false}
											loading={false}
											data={detail?.items || []}
											emptyMessage={`You don’t have an order`}
										/>
									</div>
								</CardLayout>
							);
						})}
					</div>
				</div>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button
					type="accent"
					className="gap-2 ml-auto"
					loading={loading}
					onClick={submitIssuanceForm}
				>
					<FlatIcon icon="rr-disk" />
					Submit issuance form
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(CreateIssuanceModal);
