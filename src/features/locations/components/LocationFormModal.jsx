import { useState, Fragment, forwardRef, useImperativeHandle } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import Modal from "@/src/components/modals/Modal";
import TextInputField from "@/src/components/forms/TextInputField";
import { useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import { useItemBranch } from "../hooks/useItemBranchesHook";

const LocationFormModal = (props, ref) => {
	const { addToList, updateInList } = props;
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();
	const { saveItemBranch } = useItemBranch();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);

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
		let formData = {
			...data,
		};
		saveItemBranch({
			...formData,
			setLoading,
			setErrors,
			callback: successCallBack,
		});
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
	return (
		<Modal open={open} hide={hide} size="sm">
			<ModalHeader
				title={id ? "Update " : "Create " + "location or branch"}
				subtitle="Enter the deatils of location or branch"
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				{console.log("errors", errors)}
				<div className="grid grid-cols-1 gap-4">
					<TextInputField
						label={`Location/Branch name`}
						placeholder={"Enter location/branch name"}
						id="name"
						name="name"
						error={errors?.name?.message}
						{...register("name", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Location/Branch address`}
						placeholder={"Enter location/branch address"}
						id="address"
						name="address"
						error={errors?.address?.message}
						{...register("address", {
							required: "This field is required",
						})}
					/>
				</div>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button onClick={handleSubmit(submitForm)} loading={loading}>
					Submit
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(LocationFormModal);
