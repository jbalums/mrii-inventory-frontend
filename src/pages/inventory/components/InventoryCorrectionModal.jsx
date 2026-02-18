import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextAreaInputField from "@/src/components/forms/TextAreaInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { useItemCategories } from "@/src/features/item-categories/hooks/useItemCategoriesHook";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useFormHelper from "@/src/helpers/useFormHelper";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useInventory from "../hooks/useInventory";
import Infotext from "@/src/components/InfoText";

const InventoryCorrectionModal = ({ refreshData, branch_id }, ref) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		control,
		setValue,
		formState: { errors },
	} = useForm();
	const { saveInventoryCorrection } = useInventory();

	const [open, setOpen] = useState(false);
	const [inventoryData, setInventoryData] = useState(null);
	const [refreshModalFn, setRefreshModalFn] = useState(null);
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		if (data) {
			reset({
				correction_amount: 0,
				correction_reason: "",
			});

			if (data) {
				setInventoryData(data?.data);
				setRefreshModalFn({
					fn: data?.refreshModalData,
					setInfo: data?.setInfo,
				});
			}
		} else {
			reset({
				correction_amount: 0,
				correction_reason: "",
			});
			setInventoryData(null);
		}
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
		setTimeout(() => {
			reset({
				correction_amount: 0,
				correction_reason: "",
			});
			setInventoryData(null);
		}, 300);
	};

	const successCallBack = (data) => {
		if (refreshModalFn?.fn) refreshModalFn.fn();
		if (refreshModalFn?.setInfo) refreshModalFn.setInfo(data);
		if (refreshData) refreshData();
		hide();
	};

	const submitForm = (data) => {
		setLoading(true);
		let formData = {
			_method: "PATCH",
			product_id: inventoryData?.product_id,
			branch_id: inventoryData?.branch_id,
			...data,
		};
		saveInventoryCorrection({
			setLoading,
			setError,
			callback: successCallBack,
			...formData,
		});
	};
	useEffect(() => {
		setValue(
			"correction_amount",
			parseFloat(watch("expected_total_quantity") || 0) -
				parseFloat(inventoryData?.total_quantity || 0),
		);
	}, [watch("expected_total_quantity")]);
	return (
		<Modal open={open} hide={hide} size="lg">
			<ModalHeader
				title={`Inventory Correction`}
				subtitle={`Use correction of inventory quantities`}
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
					<div className="xl:col-span-5 flex flex-col gap-4">
						<Infotext
							label="Code"
							text={<b>{inventoryData?.product?.code}</b>}
						/>
						<Infotext
							label="Product Name"
							text={<b>{inventoryData?.product?.name}</b>}
						/>
						<Infotext
							label="Product Unit of Measurement"
							text={
								<b>
									{inventoryData?.product?.unit_measurement}
								</b>
							}
						/>
						<Infotext
							titleClassName="!text-lg text-black"
							label="Total Quantity:"
							text={
								<b className="text-2xl text-black ">
									{inventoryData?.total_quantity}
								</b>
							}
						/>
					</div>
					<div className="xl:col-span-7 p-4 bg-white rounded-lg">
						<h3 className="mt-2 mb-4 border-black border-b">
							Inventory Correction Form
						</h3>
						<form
							autoComplete="off"
							className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-1 gap-4"
						>
							<TextInputField
								type="number"
								labelClassName="text-green-700"
								inputClassName="!text-xl text-green-700 font-bold"
								label={
									<>
										Expected stock total quantity after
										correction
									</>
								}
								placeholder={
									"Set the expected stock total quantity after correction. "
								}
								error={errors?.expected_total_quantity?.message}
								{...register("expected_total_quantity", {
									required: "This field is required",
								})}
							/>
							<TextInputField
								type="number"
								readOnly
								labelClassName="text-blue-700"
								inputClassName="!text-xl text-blue-700 font-bold"
								label={<>Correction amount</>}
								placeholder={"Set the correction amount. "}
								error={errors?.correction_amount?.message}
								{...register("correction_amount", {
									required: "This field is required",
								})}
							/>

							<TextAreaInputField
								label={
									<>
										Reason for correction
										<br />
										<small className="font-normal">
											Set the reason for inventory
											correction.
										</small>
									</>
								}
								rows={6}
								placeholder={
									"Indicate why the correction is being made for future reference. Include details such as the cause of the discrepancy and any relevant information that can help in understanding the correction."
								}
								error={errors?.correction_reason?.message}
								{...register("correction_reason", {
									required: "This field is required",
								})}
							/>
						</form>
						<div className="flex flex-col mt-4 justify-center">
							<small className="text-xs mb-2 text-red-600 text-center">
								This action will adjust the current stock
								quantity accordingly and help maintain accurate
								inventory records. Please ensure that the
								correction amount is entered correctly, and
								provide a clear reason for the adjustment to
								facilitate future reference and auditing
								purposes.
							</small>
							<Button
								type="danger"
								className=" w-full text-center"
								onClick={handleSubmit(submitForm)}
								loading={loading}
							>
								<FlatIcon icon="rs-disk  text-2xl" />
								<div className="flex-row flex-wrap items-start justify-start align-baseline">
									<div className="font-bold">
										Save Inventory Correction
									</div>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</ModalBody>
			{/* <ModalFooter
				className={`flex flex-wrap items-center justify-center`}
			></ModalFooter> */}
		</Modal>
	);
};

export default forwardRef(InventoryCorrectionModal);
