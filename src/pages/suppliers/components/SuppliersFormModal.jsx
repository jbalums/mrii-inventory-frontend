import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Fade from "react-reveal/Fade";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { useSuppliersHook } from "../hooks/useSuppliersHook";
import { v4 as uuidv4 } from "uuid";
const ContactPersonForm = ({
	index,
	contact,
	errors,
	register,
	removeContact,
}) => {
	return (
		<div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 border border-secondary rounded-lg p-4 relative">
			<TextInputField
				label={`Contact Person name`}
				placeholder={"Enter person name"}
				id="name"
				name="name"
				defaultValue={contact?.name}
				onChange={(e) => {
					contact.name = e.target.value;
				}}
			/>
			<div className="hidden lg:block"></div>
			<div
				className="p-2 rounded-full h-8 w-8 bg-danger text-white flex items-center justify-center absolute right-1 top-1 lg:top-4 lg:right-4 cursor-pointer hover:shadow-xl duration-200"
				onClick={() => {
					removeContact(index);
				}}
			>
				<FlatIcon icon="rr-x" />
			</div>
			<TextInputField
				label={`Mobile No. / Tel No.`}
				placeholder={"Enter mobile No. / tel No."}
				id="number"
				name="number"
				defaultValue={contact?.number}
				onChange={(e) => {
					contact.name = e.target.value;
				}}
			/>
			<TextInputField
				label={`Email`}
				placeholder={"Enter email"}
				id="email"
				name="email"
				type="email"
				defaultValue={contact?.email}
				onChange={(e) => {
					contact.name = e.target.value;
				}}
			/>
		</div>
	);
};

const BanksForm = ({ bank, index, removeBank }) => {
	return (
		<div className="col-span-2 grid grid-cols-1 lg:grid-cols-12 gap-4 border border-secondary rounded-lg p-4 relative">
			<TextInputField
				className={`lg:col-span-3`}
				label={`Account/Bank name`}
				placeholder={"Account/Bank name"}
				id="name"
				name="name"
				defaultValue={bank.name}
				onChange={(e) => {
					bank.name = e.target.value;
				}}
			/>
			<TextInputField
				className={`lg:col-span-4`}
				label={`Account number`}
				placeholder={"Account number"}
				id="account_number"
				name="account_number"
				defaultValue={bank.account_number}
				onChange={(e) => {
					bank.name = e.target.value;
				}}
			/>
			<TextInputField
				className={`lg:col-span-4`}
				label={`Account name`}
				placeholder={"Account name"}
				id="account_name"
				name="account_name"
				defaultValue={bank.account_name}
				onChange={(e) => {
					bank.name = e.target.value;
				}}
			/>
			<div className="flex items-center justify-center">
				<div
					className="p-2 rounded-xl h-11 w-full lg:w-11 bg-danger text-white gap-2 flex items-center justify-center  cursor-pointer hover:shadow-xl duration-200"
					onClick={() => {
						removeBank(index);
					}}
				>
					<FlatIcon icon="rr-x" />
					<span className="lg:hidden">Remove row</span>
				</div>
			</div>
		</div>
	);
};
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
	const { saveSupplier } = useSuppliersHook();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);

	const [contacts, setContacts] = useState();
	const [banks, setBanks] = useState();

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
			if (data?.contacts) {
				setContacts(data?.contacts);
			}
			if (data?.banks) {
				setBanks(data?.banks);
			}
		} else {
			reset();
			setContacts([]);
			setBanks([]);
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
		let formData = new FormData();

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
		});
		saveSupplier(formData, {
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
				subtitle="Enter the deatils of supplier"
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
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
					<h3 className="border-b text-secondary">
						Supplier Contacts Person
					</h3>
					{contacts?.map((contact, index) => {
						return (
							<ContactPersonForm
								index={index}
								contact={contact}
								errors={errors}
								register={register}
								key={`key-${uuidv4()}`}
								removeContact={removeContact}
							/>
						);
					})}
					<div
						className="cursor-pointer border border-dashed rounded-lg border-secondary flex items-center justify-center p-4 gap-4 lg:col-span-2"
						onClick={() => {
							setContacts((prevContacts) => [
								...prevContacts,
								{
									name: "",
									number: "",
									email: "",
								},
							]);
						}}
					>
						<FlatIcon icon="rr-plus" />
						Add new contact
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<h3 className="border-b text-secondary">
						Supplier Bank accounts
					</h3>
					{banks?.map((bank, index) => {
						return (
							<BanksForm
								index={index}
								bank={bank}
								errors={errors}
								register={register}
								key={`key-${uuidv4()}`}
								removeBank={removeBank}
							/>
						);
					})}
					<div
						className="cursor-pointer border border-dashed rounded-lg border-secondary flex items-center justify-center p-4 gap-4 lg:col-span-2"
						onClick={() => {
							setBanks((prevData) => [
								...prevData,
								{
									name: "",
									account_name: "",
									account_number: "",
								},
							]);
						}}
					>
						<FlatIcon icon="rr-plus" />
						Add new bank
					</div>
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
