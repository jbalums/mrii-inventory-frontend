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

const SetBeginningBalanceModal = (props, ref) => {
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
	const { updateBeginningBalance } = useInventory();
	const { getCategories } = useItemCategories();
	const { getBranches } = useBranchLocation();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [product, setProduct] = useState(null);
	const [locations, setLocations] = useState([]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		console.log("begBalProductRef", data);
		if (data) {
			reset({
				...data,
			});
			setProduct(data);
			if (data?.id) {
				setId(data?.id);
			}
		} else {
			reset({
				qty: "",
			});
			setId(null);
			setProduct(null);
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
			updateInList({
				...product,
				total_quantity: data?.stock_in?.total_quantity,
			});
		} else {
			addToList({
				...product,
				total_quantity: data?.stock_in?.total_quantity,
			});
		}
		hide();
	};

	const submitForm = (data) => {
		setLoading(true);
		let formData = {
			...data,
			product_id: product?.id,
			_method: "PATCH",
		};
		updateBeginningBalance({
			setLoading,
			setError,
			id,
			callback: successCallBack,
			...formData,
		});
	};

	return (
		<Modal open={open} hide={hide} size="sm">
			<ModalHeader
				title={`Set Inventory Stock`}
				subtitle={`This will update your current inventory stock`}
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				<div className="grid grid-cols-1 lg:grid-cols-3"></div>
				<form
					autoComplete="off"
					className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-1 gap-4"
				>
					<TextInputField
						type="number"
						min={0}
						label={`Quantity`}
						placeholder={"Enter quantity"}
						error={errors?.qty?.message}
						{...register("qty", {
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
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(SetBeginningBalanceModal);
