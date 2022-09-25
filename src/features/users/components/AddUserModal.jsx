import Button from "@/src/components/Button";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserHook } from "../hooks/useUserHook";

const AddUserModal = (props, ref) => {
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
	const { saveUser } = useUserHook();

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
				firstname: "",
				middlename: "",
				lastname: "",
				contact: "",
				email: "",
				password: "",
				password_confirmation: "",
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
			username: data?.email,
		};
		saveUser({
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
		<Modal open={open} hide={hide} size="lg">
			<ModalHeader
				title={id ? "Update user details" : "Add user"}
				hide={hide}
			/>
			<ModalBody className={`py-4`}>
				{console.log("errors", errors)}
				<div className="flex flex-col lg:grid grid-cols-12 gap-4">
					<TextInputField
						label={`Firstname`}
						className="col-span-4"
						placeholder={"Enter firstname"}
						id="firstname"
						name="firstname"
						inputClassName="!bg-foreground"
						error={errors?.firstname?.message}
						{...register("firstname", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Middlename`}
						className="col-span-4"
						placeholder={"Enter Middlename"}
						id="middlename"
						name="middlename"
						inputClassName="!bg-foreground"
						error={errors?.middlename?.message}
						{...register("lastname")}
					/>
					<TextInputField
						label={`Lastname`}
						className="col-span-4"
						placeholder={"Enter Lastname"}
						id="lastname"
						inputClassName="!bg-foreground"
						name="lastname"
						error={errors?.lastname?.message}
						{...register("lastname", {
							required: "This field is required",
						})}
					/>

					<TextInputField
						label={`Contact No.`}
						className="col-span-6"
						placeholder={"Enter contact no."}
						id="contact"
						name="contact"
						inputClassName="!bg-foreground"
						error={errors?.contact?.message}
						{...register("contact", {
							required: "This field is required",
						})}
					/>
					<hr className="col-span-12 my-4" />
					<TextInputField
						label={`Email address`}
						className="col-span-6"
						placeholder={"Enter email"}
						id="email"
						name="email"
						type="email"
						inputClassName="!bg-foreground"
						error={errors?.email?.message}
						{...register("email", {
							required: "This field is required",
						})}
					/>
					<div></div>
					{id ? (
						" "
					) : (
						<>
							<TextInputField
								label={`Password`}
								className="col-span-6"
								placeholder={"Enter Password"}
								id="password"
								name="password"
								inputClassName="!bg-foreground"
								type="password"
								error={errors?.password?.message}
								{...register("password", {
									required: "This field is required",
								})}
							/>
							<TextInputField
								label={`Confirm Password`}
								className="col-span-6"
								placeholder={"Confirm password"}
								id="password_confirmation"
								inputClassName="!bg-foreground"
								type="password"
								name="password_confirmation"
								error={errors?.password_confirmation?.message}
								{...register("password_confirmation", {
									required: "This field is required",
									validate: (value) => {
										if (value === watch("password")) {
											return true;
										}
										setError("password", {
											type: "manual",
											message: "Password and Confirm Password doesnt match",
										});
										return false;
									},
								})}
							/>
						</>
					)}
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

export default forwardRef(AddUserModal);
