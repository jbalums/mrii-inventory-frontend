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
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth.js";

const CreateIssuanceModal = (props, ref) => {
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

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();

	console.log("useruseruser", user);
	const [list, setList] = useState([
		/* {
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
		}, */
	]);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const updateList = (item) => {
		setList((list) => list.map((x) => (x.id == item.id ? item : x)));
	};
	const show = (data) => {
		setList(data || []);
		setLoading(false);
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
		/* saveRequestOrder(data, list)
			.then((res) => {
				console.log("saveRequestOrder", res);
				toast.success("Request order submitted successfully!");
				hide();
			})
			.finally(() => {
				setLoading(false);
			}); */
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
				accessorKey: "product.code",
				className: "border-t !bg-foreground",
				cellClassName: "",
			},
			{
				header: "Name",
				accessorKey: "product.name",
				className: "border-t !bg-foreground",
				cellClassName: "",
			},
			/* {
				header: "Location",
				accessorKey: "product.location",
				className: "border-t !bg-foreground",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					console.log("original?.location", original);
					return original?.location?.name || "-";
				},
			}, */
			{
				header: "UoM",
				accessorKey: "product.unit_measurement",
				className: "border-t !bg-foreground",
				cellClassName: "",
			},

			{
				header: "Requested Qty",
				accessorKey: "qty1",
				className: "border-t !bg-foreground",
				thClassName: "",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return 5;
				},
			},
			{
				header: "Fullfilled Qty",
				accessorKey: "fullfilledqty",
				className: "border-t !bg-foreground",
				thClassName: "",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return 2;
				},
			},
			{
				header: "Quantity",
				accessorKey: "qty",
				className: "border-t !bg-foreground",
				thClassName: "flex justify-center items-center",
				cell: ({ row: { original } }) => {
					console.log("datadatadata original", original);
					return (
						<QtyInputField
							qty={original?.quantity}
							setQty={(qty) => {
								let item = original;
								item.quantity = 1;
								updateList(item);
							}}
						/>
					);
				},
			},
			/* {
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
			}, */
		],
		[]
	);
	return (
		<Modal open={open} hide={hide} size="3xl">
			<ModalHeader title={`Issuance Form`} hide={hide} />
			<ModalBody className={`py-4`}>
				{console.log("errors", errors)}
				<div className="grid grid-cols-12 gap-4 w-full">
					<div className="col-span-3">
						<CardLayout className="!bg-foreground shadow-none !p-4 flex flex-col !gap-4">
							<h4 className="text-lg text-dark">
								Request Details
							</h4>
							<TextInputField
								label="Requester name"
								placeholder=""
								value={user?.data?.name}
								readOnly={true}
								disabled={true}
							/>
							<TextInputField
								label="Requester division"
								placeholder=""
								readOnly={true}
								value={user?.data?.business_unit}
								disabled={true}
							/>
							<TextInputField
								label="Project Code"
								placeholder="Enter project code"
								{...register("project_code", {
									required: "This field is required",
								})}
								readOnly={true}
							/>
							{/* <TextInputField
								label="Approve by"
								placeholder="Enter who approved this order"
							/> */}
							<TextInputField
								label="Date needed"
								placeholder="Enter a date"
								type="date"
								// value={defaultDateValue()}
								{...register("date_needed", {
									required: "This field is required",
								})}
								readOnly={true}
							/>
						</CardLayout>
					</div>
					<div className="col-span-9">
						<CardLayout className="!bg-foreground shadow-none !pb-0 !px-0 flex flex-col !gap-4 h-full">
							<div className="flex items-center px-4">
								<h4 className="text-lg text-dark">
									Requested Items
								</h4>
							</div>

							<Table
								rowClick={(data) => {}}
								columns={columns}
								pagination={false}
								loading={false}
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
					Submit Issuance
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(CreateIssuanceModal);
