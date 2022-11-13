import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import QtyInputField from "@/src/components/forms/QtyInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import CardLayout from "@/src/components/layout/CardLayout";
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
import { useForm } from "react-hook-form";
import useRequestOrdersHook from "../hooks/useRequestOrdersHook";

const defaultDateValue = () => {
	let date = new Date();
	return `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`;
};
const RequestOrdersFormModal = (props, ref) => {
	const { addToList, updateInList, select_items_ref } = props;
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();
	const { saveSupplier } = useRequestOrdersHook();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [list, setList] = useState([
		{
			id: "AG454",
			name: "Banana chopper",
			location: "Cebu",
			uom: "29 kg",
			qty_on_hand: 345,
			qty_received: 345,
		},
		{
			id: "AG455",
			name: "Testing item 2",
			location: "Cebu",
			uom: "29 kg",
			qty_on_hand: 345,
			qty_received: 345,
		},
	]);
	const { data, loading: dataLoading } = useDataTable(
		`/inventory/request`,
		setList
	);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		if (data) {
			reset({
				...data,
			});
			if (data.id) {
				setId(data?.id);
			}
		} else {
			reset({
				name: "",
			});
			setId(null);
		}
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
		setTimeout(() => {
			reset();
			setId(null);
		}, 300);
	};
	const successCallBack = (data) => {
		if (id) {
			updateInList(data);
		} else {
			addToList(data);
		}
		hide();
	};
	const submitForm = (data) => {
		setLoading(true);
		let formData = {
			...data,
		};
		saveSupplier({
			...formData,
			setLoading,
			setErrors,
			callback: successCallBack,
		});
	};
	const setErrors = (data) => {
		if (data) {
			Object.keys(data).map((key) => {
				console.log("key", key, data[key][0]);
				setError(key == "username" ? "email" : key, {
					type: "manual",
					message: data[key][0],
				});
			});
		}
	};

	const columns = useMemo(
		() => [
			{
				header: "Product ID",
				accessorKey: "id",
				className: "border-t !bg-foreground",
				cellClassName: "",
			},
			{
				header: "Name",
				accessorKey: "name",
				className: "border-t !bg-foreground",
				cellClassName: "",
			},
			{
				header: "Location",
				accessorKey: "location",
				className: "border-t !bg-foreground",
				cellClassName: "",
			},
			{
				header: "UoM",
				accessorKey: "uom",
				className: "border-t !bg-foreground",
				cellClassName: "",
			},
			{
				header: "QTY on hand",
				accessorKey: "qty_on_hand",
				className: "border-t !bg-foreground ",
				cellClassName: "text-center",
			},
			{
				header: "Quantity receive",
				accessorKey: "qty_received",
				className: "border-t !bg-foreground",
				thClassName: "flex justify-center items-center",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return (
						<QtyInputField
							qty={original?.qty_on_hand}
							setQty={(qty) => {}}
						/>
					);
				},
			},
			{
				header: "Action",
				accessorKey: "name",
				className: "border-t !bg-foreground",
				cellClassName: "",
				cell: () => {
					return (
						<Button
							type="danger-light"
							size="sm"
							className="!w-8 !h-8 !rounded-full !p-0"
						>
							<FlatIcon icon="rr-trash" className="text-danger" />
						</Button>
					);
				},
			},
		],
		[]
	);
	return (
		<Modal open={open} hide={hide} size="3xl">
			<ModalHeader
				title={`Select items`}
				subtitle="Select items to order"
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				{console.log("errors", errors)}
				<div className="grid grid-cols-12 gap-4 w-full">
					<div className="col-span-3">
						<CardLayout className="!bg-foreground shadow-none !p-4 flex flex-col !gap-4">
							<h4 className="text-lg text-dark">Order form</h4>
							<TextInputField
								label="Order number"
								placeholder="Enter order number"
							/>
							<TextInputField
								label="Requestor name"
								placeholder="Enter requestor name"
							/>
							<TextInputField
								label="Requestor devision"
								placeholder="Enter requestor devision"
							/>
							<TextInputField
								label="Approve by"
								placeholder="Enter who approved this order"
							/>
							<TextInputField
								label="Order date"
								placeholder="Enter date of order"
								type="date"
								value={defaultDateValue()}
							/>
							<TextInputField
								label="Date needed"
								placeholder="Enter a date"
								type="date"
								value={defaultDateValue()}
							/>
						</CardLayout>
					</div>
					<div className="col-span-9">
						<CardLayout className="!bg-foreground shadow-none !pb-0 !px-0 flex flex-col !gap-4 h-full">
							<div className="flex items-center px-4">
								<h4 className="text-lg text-dark">
									Order form
								</h4>
								<Button
									className="ml-auto"
									onClick={() => {
										select_items_ref.current.show({
											callback: null,
											items: [],
										});
									}}
								>
									<FlatIcon
										icon="rr-shopping-bag-add"
										className="mr-3"
									/>
									Add items
								</Button>
							</div>

							<Table
								rowClick={(data) => {}}
								columns={columns}
								pagination={false}
								loading={dataLoading}
								data={list}
								emptyMessage={`You don’t have an order`}
								tableClassName={`!rounded-none !bg-foreground h-full`}
								className={`!rounded-none`}
							/>
						</CardLayout>
					</div>
				</div>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button
					type="accent"
					onClick={handleSubmit(submitForm)}
					loading={loading}
				>
					<FlatIcon icon="rs-paper-plane" className="mr-2" />
					Send order
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(RequestOrdersFormModal);
