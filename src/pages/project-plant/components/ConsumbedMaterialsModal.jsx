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

const ConsumbedMaterialsModal = (props, ref) => {
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
		setOpen(false);
	};
	const submitForm = (data) => {
		console.log(data);
		toast.success("Item successfully returned!");
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
				header: "Used/Consumed Qty",
				accessorKey: "qty_received",
				className: "text-center border-t",
				cellClassName: "!text-center w-[128px]",
				thClassName: "!text-center w-[128px]",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return (
						<QtyInputField
							setQty={(qty) => {
								let item = original;
								item.quantity = qty;
								updateList(item);
							}}
						/>
					);
				},
			},
		],
		[]
	);

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader
				title={`Used/Consumed Materials`}
				subtitle="Update materials that was used/consumed."
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<RequestOrderCard data={data} />
				{data?.details?.map((detail) => {
					return (
						<div className="flex flex-col overflow-hidden gap-2 rounded-lg py-6">
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
				<Button
					type="success"
					onClick={handleSubmit(submitForm)}
					loading={loading}
				>
					Save used/consumbed materials
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(ConsumbedMaterialsModal);
