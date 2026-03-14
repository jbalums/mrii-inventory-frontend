import { useAuth } from "@/hooks/useAuth";
import axios from "@/libs/axios";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Profile = () => {
	const { user } = useAuth();
	const {
		reset,
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const changePassword = (data) => {
		setLoading(true);
		axios
			.patch(`/management/password`, data)
			.then((res) => {
				setLoading(false);
				toast.success("Password changed successfully!");
				reset({
					old_password: "",
					password: "",
					password_confirmation: "",
				});
			})
			.catch((error) => {
				let errors = error.response.data.errors;
				if (errors) {
					Object.keys(errors).map((key) => {
						setError(key, {
							type: "manual",
							message: errors[key][0],
						});
					});
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<AppLayout
			icon={<FlatIcon icon="rr-user" />}
			title={"My profile"}
			breadcrumbs={[
				{
					to: "/profile",
					label: "My profile",
				},
			]}
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
				<div className="p-6  rounded-xl flex flex-col">
					<div className="flex flex-col gap-4 items-center justify-center">
						<img
							className="h-[144px] w-[144px] md:h-[288px] md:w-[288px] object-contain bg-primary rounded-xl"
							src={
								user?.data?.avatar?.length > 0
									? user?.data?.avatar
									: `https://api.dicebear.com/5.x/initials/svg?seed=${user?.data?.name}&scale=75`
							}
						/>
						<h4 className="text-xl text-primary font-bold">
							{user?.data?.name}
						</h4>
					</div>
					<p className="text-gray-500 text-center capitalize text-sm">
						{user?.data?.business_unit}
					</p>
					<p className="text-gray-600 font-semibold text-center uppercase -mt-1">
						{user?.data?.user_type}
					</p>
				</div>
				<div className="flex flex-col gap-y-6 xl:col-span-3">
					<div className="p-6 bg-slate-100 flex flex-col gap-y-2 rounded-xl">
						<h2 className="text-xl font-bold pb-4 mb-4 border-b gap-2 flex items-center">
							<FlatIcon icon="rr-id-badge" />
							User Details
						</h2>
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">ID</span>
							<span className="font-semibold lg:col-span-3 text-blue-600">
								{String(user?.data?.id).padStart(8, "0")}
							</span>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">Firstname</span>
							<span className="font-semibold lg:col-span-3 text-blue-600">
								{user?.data?.firstname}
							</span>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">Middlename</span>
							<span className="font-semibold lg:col-span-3 text-blue-600">
								{user?.data?.middlename}
							</span>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">Lastname</span>
							<span className="font-semibold lg:col-span-3 text-blue-600">
								{user?.data?.lastname}
							</span>
						</div>
						<hr />
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">Email</span>
							<span className="font-semibold lg:col-span-3 text-blue-600">
								{user?.data?.email}
							</span>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">Contact No.</span>
							<span className="font-semibold lg:col-span-3 text-blue-600">
								{user?.data?.contact}
							</span>
						</div>
						<hr />
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">Branch</span>
							<span className="font-semibold lg:col-span-3 text-blue-600">
								{user?.data?.branch?.name}
							</span>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">Unit</span>
							<span className="font-semibold lg:col-span-3 text-blue-600">
								{user?.data?.business_unit}
							</span>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-2 pb-2 lg:pb-0">
							<span className="font-">Position</span>
							<span className="font-semibold lg:col-span-3 text-blue-600 capitalize">
								{user?.data?.user_type}
							</span>
						</div>
					</div>
					<div className="p-6 bg-slate-100 flex flex-col gap-y-6 rounded-xl">
						<h2 className="text-xl font-bold pb-4 border-b">
							Change Password
						</h2>
						<TextInputField
							label={`Current password`}
							icon={<FlatIcon icon="rr-lock" />}
							placeholder="Current password"
							className="col-span-6"
							id="old_password"
							name="old_password"
							inputClassName=" "
							type="password"
							error={errors?.old_password?.message}
							{...register("old_password", {
								required: "This field is required",
							})}
						/>
						<TextInputField
							label={`New password`}
							icon={<FlatIcon icon="rr-lock" />}
							placeholder="New password"
							className="col-span-6"
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
							label={`Confirm new password`}
							icon={<FlatIcon icon="rr-lock" />}
							placeholder="Confirm new password"
							className="col-span-6"
							id="password_confirmation"
							name="password_confirmation"
							inputClassName=" "
							type="password"
							error={errors?.password_confirmation?.message}
							{...register("password_confirmation", {
								required: "This field is required",
							})}
						/>
						<Button
							onClick={handleSubmit(changePassword)}
							loading={loading}
						>
							Change password
						</Button>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default Profile;
