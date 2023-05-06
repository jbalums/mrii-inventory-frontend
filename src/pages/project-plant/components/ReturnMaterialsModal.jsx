import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "@/libs/axios";
import RequestOrderCard from "../../request-orders/components/RequestOrderCard";
import QtyInputField from "@/src/components/forms/QtyInputField";
import { useMemo } from "react";
import Table from "@/src/components/table/Table";
import { toast } from "react-toastify";

const ReturnMaterialsModal = (props, ref) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		formState: { errors },
		control,
	} = useForm();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (showData) => {
		console.log("datadatadata", showData);
		getDetails(showData);
		setOpen(true);
	};
	const hide = () => {
		setData(null);
		setOpen(false);
	};
	const submitForm = () => {
		console.log("submitForm", data);
		let details = data?.details;
		let items = [];

		details.map((detail) => {
			detail.items.map((item) => {
				items.push(item);
			});
		});
		console.log("submitForm itemsitems", items);

		let formData = new FormData();

		items.map((item) => {
			formData.append("requisition_items_id[]", item?.id);
			formData.append("product_id[]", item?.product?.id);
			formData.append("qty[]", item?.quantity);
		});

		axios.post(`/inventory/return-items`, formData).then((res) => {
			console.log("inventory/return-items", res.data);
			toast.success("Material successfully returned!");
		});
		hide();
	};
	const getDetails = (showData) => {
		axios
			.get(`/inventory/project-plant-orders/${showData?.id}`)
			.then((res) => {
				setData(res.data.data);
			});
	};

	const columns = useMemo(
		() => [
			{
				header: "Product ID",
				accessorKey: "product.code",
				className: "border-t",
				cellClassName: "",
			},
			{
				header: "Name",
				accessorKey: "product.name",
				className: "border-t",
				cellClassName: "",
			},
			{
				header: "UoM",
				accessorKey: "product.unit_measurement",
				className: "border-t",
				cellClassName: "",
			},

			{
				header: "Qty requested",
				accessorKey: "request_quantity",
				className: "text-center border-t",
				cellClassName: "!text-center w-[128px]",
				thClassName: "!text-center w-[128px]",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return original?.request_quantity || 0;
				},
			},
			{
				header: "Used Qty",
				accessorKey: "used_qty",
				className: "text-center border-t",
				cellClassName: "!text-center w-[128px]",
				thClassName: "!text-center w-[128px]",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return original?.used_qty || 0;
				},
			},
			{
				header: "Returned Qty",
				accessorKey: "returned_qty",
				className: "text-center border-t",
				cellClassName: "!text-center w-[128px]",
				thClassName: "!text-center w-[128px]",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return original?.returned_qty || 0;
				},
			},
			{
				header: "Return Qty",
				accessorKey: "qty_received",
				className: "text-center border-t",
				cellClassName: "!text-center w-[128px]",
				thClassName: "!text-center w-[128px]",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return parseInt(original?.request_quantity) -
						parseInt(original?.used_qty) ? (
						<QtyInputField
							max={
								parseInt(original?.request_quantity) -
									parseInt(original?.used_qty) || 0
							}
							setQty={(qty) => {
								let item = original;
								item.quantity = qty;
								updateList(item);
							}}
						/>
					) : (
						"-"
					);
				},
			},
		],
		[]
	);

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader
				title={`Return Materials`}
				subtitle="Return of unused/excess materials to main warehouse"
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<RequestOrderCard data={data} />
				{data?.details?.map((detail) => {
					return (
						<div className="flex flex-col bg- shadow border border-border gap-2 rounded-lg my-4 p-4">
							<span className="text-sm">
								Location:{" "}
								<b className="text-secondary">
									{detail?.location?.name}
								</b>
							</span>
							<Table
								rowClick={(data) => {}}
								columns={columns}
								pagination={false}
								loading={false}
								data={detail?.items}
								emptyMessage={`You don’t have an order`}
								tableClassName={`!rounded-none h-full !bg-white`}
								className={`!rounded-none `}
							/>
						</div>
					);
				})}
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button onClick={handleSubmit(submitForm)} loading={loading}>
					Return Items
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(ReturnMaterialsModal);
