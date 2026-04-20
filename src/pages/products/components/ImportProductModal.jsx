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
import { useItemUnits } from "@/src/features/item-units/hooks/useItemUnitsHook";
import axios from "@/libs/axios";
import { toast } from "react-toastify";

const ImportProductModal = (props, ref) => {
	const { addToList, updateInList, refreshData } = props;
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
	const { importProduct } = useInventory();
	const { getCategories } = useItemCategories();
	const { getItemUnits } = useItemUnits();
	const { getBranches } = useBranchLocation();

	const [open, setOpen] = useState(false);
	const [complete, setComplete] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [categories, setCategories] = useState([]);
	const [units, setUnits] = useState([]);
	const [locations, setLocations] = useState([]);
	useEffect(() => {
		let t = setTimeout(() => {
			getCategories().then((res) => {
				setCategories(res.data.data);
			});
		}, 200);
		return () => {
			clearTimeout(t);
		};
	}, []);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
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
		// setLoading(true);
		let formData = new FormData();
		formData.append("file", selectedFile?.file);
		formData.append("category_id", data?.category_id);

		setLoading(true);

		axios
			.post(`/management/import-products`, formData, {
				Headers: { "Content-Type": "multipart/ form-data" },
			})
			.then((res) => {
				refreshData();
				setTimeout(() => {
					hide();
				}, 200);
				toast.success("Products import successful!");
				// callback ? callback(res.data.data) : "";
			})
			.catch((error) => {
				toast.error(
					`Failed to submit the form. Please check your inputs!`,
				);
				if (error.response.status !== 422) throw error;
				setErrors(error.response.data.errors, setError);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleFileUpload = (event) => {
		// get the selected file from the input
		const file = event.target.files[0];
		setSelectedFile({
			file: file,
		});
	};

	return (
		<Modal open={open} hide={hide} size="md">
			<ModalHeader
				title={`Import products`}
				subtitle={`Select File to import product`}
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 gap-4">
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
					<TextInputField
						type="file"
						label={`Select file to continue`}
						className="col-span-2"
						inputClassName="bg-foreground"
						placeholder={"Select file"}
						accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
						error={errors?.file?.message}
						{...register("file", {
							required: "This field is required",
						})}
						onChange={handleFileUpload}
					/>
				</div>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button
					type="accent"
					onClick={handleSubmit(submitForm)}
					loading={loading}
					loadingMessage="Importing data please wait..."
				>
					<FlatIcon icon="rs-disk mr-2" />
					Import product
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(ImportProductModal);
