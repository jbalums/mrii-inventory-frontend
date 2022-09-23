import { useState, Fragment, forwardRef, useImperativeHandle } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import Modal from "@/src/components/modals/Modal";
import TextInputField from "@/src/components/forms/TextInputField";
import { Controller, useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import useFormHelper from "@/src/helpers/useFormHelper";
import useInventory from "../hooks/useInventory";
import FlatIcon from "@/src/components/FlatIcon";
import TextAreaInputField from "@/src/components/forms/TextAreaInputField";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import { useItemCategories } from "@/src/features/item-categories/hooks/useItemCategoriesHook";

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

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
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
	const submitForm = (data) => {
		setLoading(true);
		let formData = {
			...data,
		};
		saveProduct({
			...formData,
			setLoading,
			setErrors,
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
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
						label={`Unit of measurement`}
						inputClassName="bg-foreground"
						placeholder={"Unit of measurement"}
						error={errors?.uom?.message}
						{...register("uom", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Unit value`}
						inputClassName="bg-foreground"
						placeholder={"Unit value"}
						error={errors?.uom?.message}
						{...register("uom", {
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
								options={categories.map((category) => ({
									label: category.name,
									value: category.id,
								}))}
							/>
						)}
						name="category"
						control={control}
						rules={{
							required: {
								value: true,
								message: "This field is required",
							},
						}}
					/>
					<ReactSelectInputField
						label="Location"
						className="col-span-2"
						inputClassName="!bg-foreground"
						placeholder="Select location, branch"
					/>
					<TextInputField
						type="number"
						min={0}
						label={`Unit of measurement`}
						inputClassName="bg-foreground"
						placeholder={"Unit of measurement"}
						error={errors?.uom?.message}
						{...register("uom", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						type="number"
						min={0}
						label={`Unit value`}
						inputClassName="bg-foreground"
						placeholder={"Unit value"}
						error={errors?.uom?.message}
						{...register("uom", {
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
