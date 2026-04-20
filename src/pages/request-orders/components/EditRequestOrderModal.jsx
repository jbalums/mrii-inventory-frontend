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
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useRequestOrdersHook from "../hooks/useRequestOrdersHook";
import { useAuth } from "@/hooks/useAuth.js";
import SelectInputField from "@/src/components/forms/SelectInputField";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import { dateTodayInput, formatDateYYYMMDD, isNumeric } from "@/libs/helpers";

const defaultDateValue = () => {
	let date = new Date();
	return `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`;
};
const EditRequestOrderModal = (props, ref) => {
	const { addToList, updateInList, select_items_ref } = props;
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		control,
		formState: { errors },
	} = useForm();
	const { updateRequestOrder } = useRequestOrdersHook();
	const { getBranches } = useBranchLocation();
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [disableBtn, setDisableBtn] = useState(false);
	const [branches, setBranches] = useState([]);
	const { user } = useAuth();

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
	const removeInList = (item) => {
		setList((list) => list.filter((x) => x.id != item?.id));
	};
	const show = (data) => {
		//console.log("dataa", data);
		setList(
			data?.details[0]?.items?.map((item) => ({
				...item,
				locked: true,
			})),
		);
		setLoading(false);
		getBranches().then((res) => {
			setBranches(res.data.data);
		});
		if (data) {
			reset({
				...data,
				date_needed: formatDateYYYMMDD(new Date(data?.date_needed)),
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
		updateRequestOrder(id, data, list)
			.then((res) => {
				toast.success("Request order updated successfully!");
				successCallBack(res.data);
				hide();
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const setErrors = (data) => {
		if (data) {
			Object.keys(data).map((key) => {
				//console.log("key", key, data[key][0]);
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
				accessorKey: "code",
				className: "border-t",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return original?.product?.code
						? original?.product?.code
						: original?.code || "-";
				},
			},
			{
				header: "Name",
				accessorKey: "name",
				className: "border-t",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return original?.product?.name
						? original?.product?.name
						: original?.name || "-";
				},
			},
			{
				header: "Location",
				accessorKey: "location",
				className: "border-t",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return original?.branch?.name
						? original?.branch?.name
						: original?.location?.name || "-";
				},
			},
			{
				header: "UoM",
				accessorKey: "unit_measurement",
				className: "border-t",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return original?.product?.unit_measurement
						? original?.product?.unit_measurement
						: original?.unit_measurement || "-";
				},
			},
			{
				header: "Quantity",
				accessorKey: "qty_received",
				className: "text-center border-t",
				cellClassName: "!text-center w-[128px]",
				thClassName: "!text-center w-[128px]",
				cell: ({ row: { original } }) => {
					return (
						<QtyInputField
							qty={original?.request_quantity}
							setQty={(qty) => {
								let item = original;
								item.quantity = qty;
								updateList(item);
								if (isNumeric(qty)) {
									setDisableBtn(false);
								} else {
									setDisableBtn(true);
								}
							}}
						/>
					);
				},
			},
			{
				header: "Action",
				accessorKey: "name",
				className: "border-t",
				cellClassName: "",
				cell: ({ row }) => {
					let item = row?.original;
					return (
						<Button
							type="danger-light"
							size="sm"
							className="!w-8 !h-8 !rounded-full !p-0"
							disabled={item?.locked}
							onClick={() => {
								removeInList(item);
							}}
						>
							<FlatIcon icon="rr-trash" className="text-danger" />
						</Button>
					);
				},
			},
		],
		[],
	);
	return (
		<Modal open={open} hide={hide} size="3xl">
			<ModalHeader
				title={`Add Request order items`}
				subtitle="Fill up form to add requested request order items"
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
					<div className="lg:col-span-3">
						<CardLayout className="!bg-background shadow-none border border-slate-300 !p-4 flex flex-col !gap-4 cursor-not-allowed pointer-events-none">
							<h4 className="text-lg text-dark">Order form</h4>
							<Controller
								name="purpose"
								control={control}
								rules={{
									required: {
										value: true,
										message: "This field is required",
									},
								}}
								render={({
									field: {
										onChange,
										onBlur,
										value,
										name,
										ref,
									},
									fieldState: {
										invalid,
										isTouched,
										isDirty,
										error,
									},
								}) => (
									<ReactSelectInputField
										label="Request purpose"
										inputClassName=" "
										ref={ref}
										disabled
										value={value}
										onChange={onChange} // send value to hook form
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder="Select purpose of request"
										options={[
											{
												label: "Finished Goods",
												value: "finished_goods",
												disabled:
													user?.data?.branch_id != 1,
												description:
													"Use for FINISHED GOODS in the Warehouse. (STOCK-IN)",
											},
											{
												label: "Production",
												value: "production",
												disabled:
													user?.data?.branch_id == 1,
												description:
													"Use for PRODUCTION in the Warehouse. (STOCK-OUT)",
											},
											{
												label: "Plant/Project",
												value: "project_plant",
												disabled:
													user?.data?.branch_id == 1,
												description:
													"Use for PROJECT or PLANT. (STOCK-IN)",
											},
											{
												label: "Sale",
												value: "sale",
												description:
													"Internal stocks being SOLD TO CUSTOMER. (STOCK-OUT)",
											},
											{
												label: "Stocking",
												value: "stocking",
												disabled:
													user?.data?.branch_id == 1,
												description:
													"Select when branch wants to get/request stocks from main branch. (STOCK-IN)",
											},
											{
												label: "Internal Use",
												value: "internal_use",
												description:
													"Select when local branch wants to use/consume products. (STOCK-OUT)",
											},
											{
												label: "For Purchase",
												value: "for_purchase",
												disabled:
													user?.data?.branch_id == 1,
												description:
													"For production request transactions. (STOCK-IN)",
											},
										]}
									/>
								)}
							/>
							{watch("purpose") == "stocking" ? (
								<Controller
									name="branch_id"
									control={control}
									rules={{
										required: {
											value: true,
											message: "This field is required",
										},
									}}
									render={({
										field: {
											onChange,
											onBlur,
											value,
											name,
											ref,
										},
										fieldState: {
											invalid,
											isTouched,
											isDirty,
											error,
										},
									}) => (
										<ReactSelectInputField
											label="Request from branch"
											inputClassName=" "
											ref={ref}
											value={value}
											onChange={onChange} // send value to hook form
											onBlur={onBlur} // notify when input is touched
											error={error?.message}
											placeholder="Select branch"
											options={[
												{
													label: `Main Warehouse`,
													value: 1,
												},
											]}
										/>
									)}
								/>
							) : (
								""
							)}
							<TextInputField
								label="Reference number"
								placeholder="Enter reference number"
								error={errors?.account_code?.message}
								{...register("account_code", {
									required: "This field is required",
								})}
							/>

							<TextInputField
								label="Project code"
								placeholder="Enter project code"
								error={errors?.project_code?.message}
								{...register("project_code", {
									required: "This field is required",
								})}
							/>
							<TextInputField
								label="Date needed"
								placeholder="Enter a date"
								type="date"
								// value={defaultDateValue()}
								error={errors?.date_needed?.message}
								{...register("date_needed", {
									required: "This field is required",
								})}
							/>
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
							{/* <TextInputField
								label="Approve by"
								placeholder="Enter who approved this order"
							/> */}
						</CardLayout>
					</div>
					<div className="lg:col-span-9">
						<CardLayout className="!bg-background overflow-hidden !shadow-none border border-slate-300 !pb-0 !px-0 flex flex-col !gap-4 h-full">
							<div className="flex items-center px-4">
								<h4 className="text-lg text-dark">
									Order items
								</h4>
								<Button
									disabled={!watch("purpose")}
									className="ml-auto"
									onClick={() => {
										select_items_ref.current.show({
											callback: (data) => {
												setList(data);
											},
											items: [],
											purpose: watch("purpose"),
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

							<div className="bg-foreground bg-opacity-5 relative h-full !rounded-b-xl">
								<Table
									rowClick={(data) => {}}
									columns={columns}
									pagination={false}
									loading={false}
									data={list ? list : []}
									emptyMessage={`You don’t have an order`}
									tableClassName={`!rounded-none h-full !bg-white`}
									className={`!rounded-none `}
								/>
							</div>
						</CardLayout>
					</div>
				</div>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button
					type="accent"
					onClick={handleSubmit(submitForm)}
					loading={loading}
					disabled={disableBtn}
				>
					<FlatIcon icon="rs-paper-plane" className="mr-2" />
					Update order
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(EditRequestOrderModal);
