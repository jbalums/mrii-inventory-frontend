import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import useSelection from "@/src/helpers/useSection";
import { useEffect } from "react";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

const ViewReceivedPOModal = (props, ref) => {
	const [open, setOpen] = useState(false);
	const [purchaseOrder, setPurchaseOrder] = useState([]);
	const [loading, setLoading] = useState(false);
	const [callBack, setCallBack] = useState({ fn: null });

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		console.log("setPurchaseOrder data", data);
		setPurchaseOrder(data);
		setOpen(true);
	};
	const hide = () => {
		setPurchaseOrder([]);
		setOpen(false);
	};

	const columns = useMemo(
		() => [
			{
				header: "Product ID",
				accessorKey: "code",
				cell: (data) => {
					return data?.product?.code;
				},
			},
			{
				header: "Name",
				accessorKey: "name",
				cell: (data) => {
					return data?.product?.name;
				},
			},
			{
				header: "U/M",
				accessorKey: "unit_measurement",
				className: "!text-center",
				cell: (data) => {
					return data?.product?.unit_measurement;
				},
			},
			{
				header: "Expiry date",
				accessorKey: "expired_at",
				className: "!text-center",
				cell: (data) => {
					return (
						data?.expired_at_formatted || (
							<i className="text-placeholder text-xs">
								no expiry
							</i>
						)
					);
				},
			},
			{
				header: "Unit price",
				accessorKey: "price",
				className: "!text-center",
				cell: (data) => {
					return data?.price;
				},
			},
			{
				header: "Quantity",
				accessorKey: "quantity",
				className: "!text-center",
				cell: (data) => {
					return data?.quantity;
				},
			},
		],
		[]
	);

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader title={"View purchae order details"} hide={hide} />
			<ModalBody className={`p-4 min-h-[448px] !bg-white overflow-auto`}>
				<h4 className="font-bold text-base mb-2">
					Purchase Order Details
				</h4>
				<div className="table w-full mb-4">
					<table className=" w-full">
						<tbody>
							<tr>
								<th className="!text-left !font-semibold w-[128px]">
									PO #:
								</th>
								<td className="!text-left capitalize">
									{purchaseOrder?.purchase_order}
								</td>
								<th className="!text-left !font-semibold w-[128px]">
									Supplier:
								</th>
								<td className="!text-left capitalize">
									<div className="flex gap-4 items-center flex-wrap">
										<b>{purchaseOrder?.supplier?.name}</b> -
										<span className="text-xs">
											<b>Address: </b>
											{purchaseOrder?.supplier?.address}
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<th className="!text-left !font-semibold w-[128px]">
									Date Receive:
								</th>
								<td className="!text-left capitalize">
									{purchaseOrder?.date_receive}
								</td>
								<th className="!text-left !font-semibold w-[128px]">
									Status:
								</th>
								<td className="!text-left capitalize">
									{purchaseOrder?.status}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<h4 className="font-bold text-base mb-2">Items Received</h4>
				<div className="table w-full">
					<table>
						<thead>
							<tr>
								{columns?.map((col) => {
									return (
										<th className={col?.className}>
											{col?.header}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{purchaseOrder?.details?.map((item) => {
								return (
									<tr>
										{columns?.map((col) => {
											return (
												<td className={col?.className}>
													{col?.cell
														? col.cell(item)
														: item[col.accessorKey]}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default forwardRef(ViewReceivedPOModal);
