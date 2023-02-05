import Button from "@/src/components/Button";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useBranchLocation } from "../../locations/hooks/useBranchLocationHook";
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
		control,
		formState: { errors },
	} = useForm();
	const { saveUser } = useUserHook();
	const { getLocations } = useBranchLocation();
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [locations, setLocations] = useState([]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		console.log("showwww data", data);
		getLocations().then((res) => {
			setLocations(res.data.data);
		});
		if (data) {
			reset({
				...data,
				type: data?.user_type,
				division: data?.unit_code,
				location_id: data?.branch_id,
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
				type: "",
				division: "",
				location_id: "",
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
		console.log("submitform", data);
		setLoading(true);
		let formData = {
			...data,
			username: data?.username,
			branch_id: data?.location_id,
			location: data?.location_id,
			branch: data?.location_id,
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
				<form
					className="flex flex-col lg:grid grid-cols-12 gap-4"
					autoComplete="off"
				>
					<Controller
						render={({
							field: { onChange, onBlur, value, name, ref },
							fieldState: { invalid, isTouched, isDirty, error },
						}) => (
							<ReactSelectInputField
								label="Select User Position"
								className="lg:col-span-6"
								inputClassName=" "
								ref={ref}
								value={value}
								onChange={onChange} // send value to hook form
								onBlur={onBlur} // notify when input is touched
								error={error?.message}
								placeholder="Select user position"
								options={[
									{
										value: "admin",
										label: "Admin",
									},
									{
										value: "account_clerk",
										label: "Account Clerk",
									},
									{
										value: "warehouse_man",
										label: "Warehouseman",
									},
									{
										value: "warehouse_manger",
										label: "Warehouse Manager",
									},
									{
										value: "requestor",
										label: "Requestor",
									},
								]}
							/>
						)}
						name="type"
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
								label="Select Division"
								className="lg:col-span-6"
								inputClassName=" "
								ref={ref}
								value={value}
								onChange={onChange} // send value to hook form
								onBlur={onBlur} // notify when input is touched
								error={error?.message}
								placeholder="Select Division"
								options={[
									{
										value: "CBU",
										label: "CBU - Chemical Business Unit",
									},
									{
										value: "EBU",
										label: "EBU - Electrical Business Unit",
									},
									{
										value: "WBU",
										label: "WBU - Water Business Unit",
									},
								]}
							/>
						)}
						name="division"
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
								label="Select User's designated Location"
								className="col-span-12"
								inputClassName=" "
								ref={ref}
								value={value}
								onChange={onChange} // send value to hook form
								onBlur={onBlur} // notify when input is touched
								error={error?.message}
								placeholder="Select location"
								options={locations.map((location) => ({
									label:
										location?.name +
										` - [${location?.address}]`,
									value: location?.id,
								}))}
							/>
						)}
						name="location_id"
						control={control}
						rules={{
							required: {
								value: false,
								message: "This field is required",
							},
						}}
					/>

					<TextInputField
						label={`Firstname`}
						className="col-span-4"
						placeholder={"Enter firstname"}
						id="firstname"
						name="firstname"
						inputClassName=" "
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
						inputClassName=" "
						error={errors?.middlename?.message}
						{...register("lastname")}
					/>
					<TextInputField
						label={`Lastname`}
						className="col-span-4"
						placeholder={"Enter Lastname"}
						id="lastname"
						inputClassName=" "
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
						inputClassName=" "
						error={errors?.contact?.message}
						{...register("contact", {
							required: "This field is required",
						})}
					/>
					<hr className="col-span-12 my-4" />
					<TextInputField
						label={`Username`}
						className="col-span-6"
						placeholder={"Enter username"}
						id="username"
						name="username"
						type="username"
						autoComplete="off"
						inputClassName=" "
						error={errors?.username?.message}
						{...register("username", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						label={`Email address`}
						className="col-span-6"
						placeholder={"Enter email"}
						id="email"
						name="email"
						type="email"
						autoComplete="off"
						inputClassName=" "
						error={errors?.email?.message}
						{...register("email", {
							required: "This field is required",
						})}
					/>
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
								inputClassName=" "
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
								inputClassName=" "
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
											message:
												"Password and Confirm Password doesnt match",
										});
										return false;
									},
								})}
							/>
						</>
					)}
				</form>
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
