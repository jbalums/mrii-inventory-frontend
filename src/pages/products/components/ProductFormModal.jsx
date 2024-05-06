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
import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useInventory from "../hooks/useInventory";
import { useItemUnits } from "@/src/features/item-units/hooks/useItemUnitsHook";

const ProductFormModal = (props, ref) => {
	const { addToList, updateInList } = props;
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
	const { setErrors } = useFormHelper();
	const { saveProduct } = useInventory();
	const { getCategories } = useItemCategories();
	const { getItemUnits } = useItemUnits();
	const { getBranches } = useBranchLocation();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [units, setUnits] = useState([]);
	const [product, setProduct] = useState(null);
	const [locations, setLocations] = useState([]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		getBranches().then((res) => {
			setLocations(res.data.data);
		});
		getCategories().then((res) => {
			setCategories(res.data.data);
		});
		getItemUnits().then((res) => {
			setUnits(res.data.data);
		});
		setProduct(data);
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
				code: "",
				description: "",
				unit_value: "",
				unit_measurement: "",
				stock_low_level: "",
				reorder_point: "",
				price: "",
				brand: "",
				category_id: "",
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
		let formData = data;
		if (id) {
			formData = {
				...formData,
				code:
					product?.transactions_count > 0
						? product?.code
						: data?.code,
				_method: "PATCH",
			};
		}
		saveProduct({
			id,
			setLoading,
			setError,
			callback: successCallBack,
			...formData,
		});
	};

	return (
		<Modal open={open} hide={hide} size="md">
			<ModalHeader
				title={id ? "Update product" : "Register product"}
				subtitle={
					id ? `Update product details` : `Create a new product`
				}
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 gap-4">
					<TextInputField
						label={`Product code`}
						className="col-span-2"
						inputClassName="bg-foreground"
						placeholder={"Enter product code"}
						readOnly={
							product?.transactions_count > 0 ? true : false
						}
						error={errors?.code?.message}
						{...register("code", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Product name`}
						className="col-span-2"
						inputClassName="bg-foreground"
						placeholder={"Enter product name"}
						error={errors?.name?.message}
						{...register("name", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Product brand`}
						className="col-span-2"
						inputClassName="bg-foreground"
						placeholder={"Enter product brand"}
						error={errors?.brand?.message}
						{...register("brand", {
							required: "This field is required",
						})}
					/>
					<TextAreaInputField
						label={`Product description`}
						className="col-span-2"
						rows={4}
						inputClassName="bg-foreground"
						placeholder={"Enter product description"}
						error={errors?.description?.message}
						{...register("description", {
							required: "This field is required",
						})}
					/>

					<Controller
						render={({
							field: { onChange, onBlur, value, name, ref },
							fieldState: { invalid, isTouched, isDirty, error },
						}) => (
							<ReactSelectInputField
								label="Unit of measurement"
								className="col-span-1"
								ref={ref}
								value={value}
								onChange={onChange} // send value to hook form
								onBlur={onBlur} // notify when input is touched
								error={error?.message}
								placeholder="Select unit of measurement"
								options={units.map((data) => ({
									label: data.name,
									value: data.name,
								}))}
							/>
						)}
						name="unit_measurement"
						control={control}
						rules={{
							required: {
								value: true,
								message: "This field is required",
							},
						}}
					/>
					<TextInputField
						type="number"
						label={`Unit value`}
						inputClassName="bg-foreground"
						placeholder={"Unit value"}
						error={errors?.unit_value?.message}
						{...register("unit_value", {
							required: "This field is required",
						})}
					/>
					<Controller
						render={({
							field: { onChange, onBlur, value, name, ref },
							fieldState: { invalid, isTouched, isDirty, error },
						}) => (
							<ReactSelectInputField
								label="Default Category"
								className="col-span-2"
								ref={ref}
								value={value}
								onChange={onChange} // send value to hook form
								onBlur={onBlur} // notify when input is touched
								error={error?.message}
								placeholder="Select category"
								options={categories.map((data) => ({
									label: data.name,
									value: data.id,
								}))}
							/>
						)}
						name="category_id"
						control={control}
						rules={{
							required: {
								value: true,
								message: "This field is required",
							},
						}}
					/>
				</div>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button
					type="accent"
					onClick={handleSubmit(submitForm)}
					loading={loading}
				>
					<FlatIcon icon="rs-disk mr-2" />
					Save product
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(ProductFormModal);
