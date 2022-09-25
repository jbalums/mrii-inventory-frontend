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
import { useItemBranch } from "@/src/features/locations/hooks/useItemBranchesHook";
import useFormHelper from "@/src/helpers/useFormHelper";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useInventory from "../hooks/useInventory";

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
	const { getBranches } = useItemBranch();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
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
		saveProduct({
			setLoading,
			setError,
			callback: successCallBack,
			...formData,
		});
	};

	return (
		<Modal open={open} hide={hide} size="md">
			<ModalHeader
				title={id ? "Register product" : "Register product"}
				subtitle={`Register your new product`}
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 gap-4">
					<TextInputField
						label={`Product code`}
						className="col-span-2"
						inputClassName="bg-foreground"
						placeholder={"Enter product code"}
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
					<TextInputField
						label={`Product Price`}
						className="col-span-2"
						type="number"
						rows={4}
						inputClassName="bg-foreground"
						placeholder={"Enter product price"}
						error={errors?.price?.message}
						{...register("price", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Unit of measurement`}
						inputClassName="bg-foreground"
						placeholder={"Unit of measurement"}
						error={errors?.unit_measurement?.message}
						{...register("unit_measurement", {
							required: "This field is required",
						})}
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
								label="Category"
								className="col-span-2"
								inputClassName="!bg-foreground"
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
						name="category"
						control={control}
						rules={{
							required: {
								value: false,
								message: "This field is required",
							},
						}}
					/>

					<Controller
						render={({
							field: { onChange, onBlur, value, name, ref },
							fieldState: { invalid, isTouched, isDirty, error },
						}) => (
							<ReactSelectInputField
								label="Location"
								className="col-span-2"
								inputClassName="!bg-foreground"
								ref={ref}
								value={value}
								onChange={onChange} // send value to hook form
								onBlur={onBlur} // notify when input is touched
								error={error?.message}
								placeholder="Select location, branch"
								options={locations.map((data) => ({
									label: data.name + ` [${data.address}]`,
									value: data.id,
								}))}
							/>
						)}
						name="location"
						control={control}
						rules={{
							required: {
								value: false,
								message: "This field is required",
							},
						}}
					/>
					<TextInputField
						type="number"
						min={0}
						label={`Set minimum level`}
						inputClassName="bg-foreground"
						placeholder={"Set minimum level"}
						error={errors?.stock_low_level?.message}
						{...register("stock_low_level", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						type="number"
						min={0}
						label={`Set reorder point`}
						inputClassName="bg-foreground"
						placeholder={"Set reorder point"}
						error={errors?.reorder_point?.message}
						{...register("reorder_point", {
							required: "This field is required",
						})}
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
