import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Fade from "react-reveal/Fade";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSuppliersHook } from "../hooks/useSuppliersHook";
import { v4 as uuidv4 } from "uuid";
import Contacts from "@/src/pages/suppliers/components/Contacts.jsx";
import Banks from "@/src/pages/suppliers/components/Banks.jsx";

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
		control,
	} = useForm();

	const { saveSupplier } = useSuppliersHook();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		console.log("dataaaaa", data);
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
				address: "",
				street: "",
				code: "",
				owner: "",
				tin: "",
				contacts: [
					{
						name: "",
						number: "",
						email: "",
					},
				],
				banks: [
					{
						name: "",
						account_number: "",
						account_name: "",
					},
				],
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
		console.log(data);
		setLoading(true);
		/*let formData = new FormData();

		formData.append("name", data?.name);
		formData.append("address", data?.address);
		formData.append("street", data?.street);
		formData.append("code", data?.code);
		formData.append("owner", data?.owner);
		formData.append("tin", data?.tin);
		contacts.map((contact) => {
			formData.append("name", contact?.name);
			formData.append("number", contact?.number);
			formData.append("email", contact?.email);
		});
		banks.map((bank) => {
			formData.append("name", bank?.name);
			formData.append("account_name", bank?.account_name);
			formData.append("account_number", bank?.account_number);
		});*/

		saveSupplier(data, {
			id: id,
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

	const removeContact = (index) => {
		setContacts((prevData) => prevData.filter((data, i) => i != index));
	};
	const removeBank = (index) => {
		setBanks((prevData) => prevData.filter((data, i) => i != index));
	};

	return (
		<Modal open={open} hide={hide} size="lg">
			<ModalHeader
				title={id ? "Update " : "Create " + "supplier"}
				subtitle="Enter the details of supplier"
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				{console.log("errors", errors)}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
					<TextInputField
						className={`lg:col-span-2`}
						label={`Supplier name`}
						placeholder={"Enter name"}
						id="name"
						name="name"
						error={errors?.name?.message}
						{...register("name", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						className={`lg:col-span-2`}
						label={`Supplier address`}
						placeholder={"Enter address"}
						id="address"
						name="address"
						error={errors?.address?.message}
						{...register("address", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						className={`lg:col-span-2`}
						label={`Supplier street`}
						placeholder={"Enter street"}
						id="street"
						name="street"
						error={errors?.street?.message}
						{...register("street", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Supplier Code`}
						placeholder={"Enter code"}
						id="code"
						name="code"
						error={errors?.code?.message}
						{...register("code", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Supplier Owner`}
						placeholder={"Enter Owner"}
						id="owner"
						name="owner"
						error={errors?.owner?.message}
						{...register("owner", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Supplier TIN No.`}
						placeholder={"Enter Supplier TIN No."}
						id="tin"
						name="tin"
						error={errors?.tin?.message}
						{...register("tin", {
							required: "This field is required",
						})}
					/>
				</div>
				<Contacts control={control} register={register} />
				<Banks control={control} register={register} />
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
