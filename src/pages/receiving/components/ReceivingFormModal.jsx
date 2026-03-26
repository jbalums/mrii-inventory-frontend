import { dateTodayInput } from "@/libs/helpers";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import useSelection from "@/src/helpers/useSection";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { useSuppliersHook } from "../../suppliers/hooks/useSuppliersHook";
import useReceiving from "../hooks/useReceivingHook";
import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";
import { toast } from "react-toastify";

const today = new Date();

const QtyInput = ({ qty, updateQty, className }) => {
	const [val, setVal] = useState(0);
	useEffect(() => {
		setVal(qty || 0);
	}, [qty]);

	useEffect(() => {
		let t = setTimeout(() => {
			updateQty(val);
		}, 200);
		return () => {
			clearTimeout(t);
		};
	}, [val]);
	return (
		<input
			value={val}
			type="number"
			className={`rounded-md px-2 py-1 w-[88px] text-center bg-foreground ${className}`}
			placeholder="Qty"
			onChange={(e) => {
				setVal(e.target.value);
			}}
			onKeyUp={(e) => {
				setVal(e.target.value);
			}}
			onBlur={(e) => {
				updateQty(e.target.value);
			}}
		/>
	);
};
const DateInput = ({ date, update }) => {
	const [val, setVal] = useState(date);
	useEffect(() => {
		console.log("dateee111", date);
		if (date) {
			let d = new Date(date);
			console.log(
				"dateee222",
				`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
			);
			setVal(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
		}
	}, [date]);
	return (
		<input
			type="date"
			value={val}
			className="rounded-md px-2 py-1 w-[144px] text-center bg-foreground"
			placeholder="Expiry Date"
			min={`${today.getFullYear()}-${
				today.getMonth() + 1
			}-${today.getDate()}`}
			onChange={(e) => {
				setVal(e.target.value);
			}}
			onBlur={(e) => {
				update(e.target.value);
			}}
		/>
	);
};
const PriceInput = ({ price, update }) => {
	const [val, setVal] = useState(price);
	useEffect(() => {
		setVal(price || 0.0);
	}, [price]);

	useEffect(() => {
		let t = setTimeout(() => {
			update(val);
		}, 200);
		return () => {
			clearTimeout(t);
		};
	}, [val]);
	return (
		<input
			type="text"
			value={val}
			className="rounded-md px-2 py-1 w-[100px] text-center bg-foreground"
			placeholder="Unit Price"
			onChange={(e) => {
				setVal(e.target.value);
			}}
			onKeyUp={(e) => {
				setVal(e.target.value);
			}}
			onBlur={(e) => {
				update(e.target.value);
			}}
		/>
	);
};
const ReceivingFormModal = (props, ref) => {
	const { add_items_received, updateInList, addToList } = props;
	const {
		register,
		handleSubmit,
		setError,
		watch,
		setValue,
		clearErrors,
		reset,
		control,
		formState: { errors },
	} = useForm();
	const { saveReceiving } = useReceiving();
	const { getSuppliers } = useSuppliersHook();
	const { selectedItems, setSelectedItems, isSelected, selectItem } =
		useSelection();
	const [suppliers, setSuppliers] = useState([]);
	const [list, setList] = useState([]);

	const [data, setData] = useState(null);

	useEffect(() => {
		getSuppliers().then((res) => {
			setSuppliers(res.data.data);
		});
	}, []);

	/* useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]); */

	const columns = useMemo(
		() => [
			{
				header: "Product ID",
				accessorKey: "code",
			},
			{
				header: "Name",
				accessorKey: "name",
			},
			{
				header: "UoM",
				accessorKey: "unit_measurement",
				className: "!text-center",
			},
			{
				header: "Expiry date",
				accessorKey: "expired_at",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return (
						<DateInput
							date={item?.expired_at}
							update={(value) => {
								item.expired_at = value;
							}}
						/>
					);
				},
			},
			{
				header: "Unit price",
				accessorKey: "price",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return (
						<PriceInput
							price={item?.price}
							update={(value) => {
								item.price = value;
							}}
						/>
					);
				},
			},
			{
				header: "Quantity",
				accessorKey: "quantity",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return (
						<QtyInput
							className={`receiving-qty`}
							qty={item?.quantity || 0}
							updateQty={(qty) => {
								item.quantity = qty;
							}}
						/>
					);
				},
			},
			{
				header: "Remove",
				id: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return (
						<>
							<div
								className="flex items-center justify-center text-center cursor-pointer"
								onClick={() => {
									setList((list) =>
										list.filter((x) => x.id != item?.id),
									);
									setSelectedItems((list) =>
										list.filter((x) => x.id != item?.id),
									);
								}}
							>
								<FlatIcon
									icon="rr-trash"
									className={`-mb-1 text-danger duration-200 text-lg`}
								/>
							</div>
						</>
					);
				},
			},
		],
		[list, selectedItems],
	);

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setList([]);
		setSelectedItems([]);
		setId(data?.id);
		setData(data);
		setValue("purchase_order", data?.purchase_order || "");
		setValue("supplier_id", data?.supplier?.id || "");
		setTimeout(() => {
			if (data?.details?.length > 0) {
				setList(
					data?.details.map((item) => ({
						...item?.product,
						...item,
					})),
				);
				setSelectedItems(
					data?.details.map((item) => ({
						...item?.product,
						...item,
					})),
				);
			}
		}, 200);
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
		setTimeout(() => {
			reset();
			setId(null);
			setList([]);
			setSelectedItems([]);
			setData(null);
		}, 300);
	};

	const successCallBack = (resData) => {
		console.log("res inventory/receiving successCallBack", resData);

		if (data?.id) {
			updateInList(resData);
		} else {
			addToList(resData);
		}
		hide();
	};

	const submitForm = (data) => {
		console.log("submit Form ", data);
		setLoading(true);

		if (selectedItems.some((item) => item.quantity == 0)) {
			toast.error(
				`Check your inputs, Quantity must be greater than zero!`,
			);

			setTimeout(() => {
				setLoading(false);
			}, 500);

			return;
		}
		let formData = {
			...data,
			products: selectedItems.map((item) => item.id),
			quantity: selectedItems.map((item) => item.quantity),
			expired_at: selectedItems.map((item) => item.expired_at),
			price: selectedItems.map((item) => item.price),
			status: "completed",
		};
		if (id) {
			saveReceiving({
				id: id,
				setLoading,
				setError,
				callback: successCallBack,
				...formData,
			});
		} else {
			saveReceiving({
				id: null,
				setLoading,
				setError,
				callback: successCallBack,
				...formData,
			});
		}
	};

	return (
		<Modal open={open} hide={hide} size="2xl">
			<ModalHeader
				title={`Receive`}
				subtitle={`Receive order from supplier`}
				hide={hide}
			/>
			<ModalBody className={`py-4 min-h-[448px]`}>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full min-h-[448px]">
					<div className="xl:col-span-3 lg:col-span-4 gap-4 flex flex-col h-full">
						<div className="bg-foreground rounded-lg p-4 gap-4 flex flex-col h-full">
							<h4 className="text-lg text-darker font-bold">
								Receiving form
							</h4>
							<TextInputField
								label={`Date received`}
								className="col-span-2"
								inputClassName="bg-"
								type="date"
								placeholder={"Enter date received"}
								defaultValue={dateTodayInput()}
								error={errors?.date_receive?.message}
								max={dateTodayInput()}
								{...register("date_receive", {
									required: "This field is required",
								})}
							/>
							<TextInputField
								label={`PO Number`}
								className="col-span-2"
								inputClassName="bg-"
								placeholder={"Enter purchase order number"}
								error={errors?.purchase_order?.message}
								{...register("purchase_order", {
									required: "This field is required",
								})}
							/>
							<TextInputField
								label={`Reference Invoice Number`}
								className="col-span-2"
								inputClassName="bg-"
								placeholder={"Enter reference invoice number"}
								error={
									errors?.reference_invoice_number?.message
								}
								{...register("reference_invoice_number")}
							/>
							<TextInputField
								label={`Project Name`}
								className="col-span-2"
								inputClassName="bg-"
								placeholder={"Enter project name"}
								error={errors?.project_name?.message}
								{...register("project_name")}
							/>

							<Controller
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
										label="Select Supplier"
										className="col-span-2"
										inputClassName="!bg-"
										ref={ref}
										value={value}
										onChange={onChange} // send value to hook form
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder="Select supplier"
										options={suppliers.map((supplier) => ({
											label:
												supplier?.name +
												` - [${supplier?.address}]`,
											value: supplier?.id,
										}))}
									/>
								)}
								name="supplier_id"
								control={control}
								rules={{
									required: {
										value: false,
										message: "This field is required",
									},
								}}
							/>
						</div>
					</div>
					<div className="xl:col-span-9 lg:col-span-8 w-full gap-4 flex flex-col h-full">
						<div className="bg-foreground rounded-lg p-4 gap-y-4 flex flex-col h-full">
							<div className="flex items-center">
								<h4 className="text-lg text-darker font-bold mr-auto">
									List of received items
								</h4>
								<Button
									onClick={() => {
										add_items_received.current.show({
											callback: (items) => {
												setList(items);
												setSelectedItems(items);
											},
											items: list,
										});
									}}
								>
									Add items
								</Button>
							</div>
							<Table
								columns={columns}
								// loading={dataLoading}
								data={list}
								emptyMessage={"No items added"}
							/>
						</div>
					</div>
				</div>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button
					type="accent"
					onClick={handleSubmit(submitForm, () => {
						// This callback is triggered when validation fails
						console.log("Validation failed, resubmitting allowed");
					})}
					loading={loading}
				>
					<FlatIcon icon="rs-disk mr-2" />
					Save recieved purchase order
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(ReceivingFormModal);
