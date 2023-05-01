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
	const { getBranches } = useBranchLocation();

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
		if (data) {
			reset({
				...data,
			});
			if (data.id) {
				setId(data?.id);
			}
		} else {
			reset({
				stock_low_level: "",
				reorder_point: "",
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
			_method: "PATCH",
		};
		saveProduct({
			setLoading,
			setError,
			id,
			callback: successCallBack,
			...formData,
		});
	};

	return (
		<Modal open={open} hide={hide} size="md">
			<ModalHeader
				title={`Update product Price`}
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<form
					autoComplete="off"
					className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-1 gap-4"
				>
					<TextInputField
						type="number"
						min={0}
						label={`Price`}
						placeholder={"Set new price"}
						error={errors?.price?.message}
						{...register("price", {
							required: "This field is required",
						})}
					/> 
				</form>
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
