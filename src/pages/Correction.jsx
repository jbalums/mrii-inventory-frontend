import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";
import TextInputField from "../components/forms/TextInputField";
import SelectInputField from "../components/forms/SelectInputField";
import Button from "../components/Button";
import { Controller, useForm } from "react-hook-form";
import ReactSelectInputField from "../components/forms/ReactSelectInputField";
import axios from "@/libs/axios";
import { toast } from "react-toastify";

const Dashboard = () => {
	const [dashboard, setDashboard] = useState(null);
	const [loading, setLoading] = useState(true);
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

	useNoBugUseEffect({
		functions: () => {
			setLoading(true);
		},
		params: [1],
	});

	const save = (data) => {
		axios
			.post(`inventory/AUzNo13OhD1ONaRO/correction`, {
				_method: "POST",
				...data,
			})
			.then((res) => {
				//console.log("res", res);
				toast.success("PO recieved updated successfully!");
			})
			.catch((error) => {
				//console.log("errror", error);
				toast.error(
					`Failed to submit the form. Please check your inputs!`,
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<AppLayout title="CORRECTION">
			<div className="grid grid-cols-2 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
				<TextInputField
					{...register("request_account_code", {
						required: "This field is required",
					})}
					name="request_account_code"
					error={errors?.request_account_code?.message}
					label="Account Code:"
					placeholder="Account Code:"
				/>
				<TextInputField
					{...register("product_id", {
						required: "This field is required",
					})}
					name="product_id"
					error={errors?.product_id?.message}
					label="ProductID"
					placeholder="ProductID"
				/>
				<TextInputField
					{...register("qty", {
						required: "This field is required",
					})}
					name="qty"
					error={errors?.qty?.message}
					label="Qty:"
					placeholder="Qty:"
				/>

				<Controller
					render={({
						field: { onChange, onBlur, value, name, ref },
						fieldState: { invalid, isTouched, isDirty, error },
					}) => (
						<ReactSelectInputField
							label="Select Movement"
							className="lg:col-span-1"
							inputClassName=" "
							ref={ref}
							value={value}
							onChange={onChange} // send value to hook form
							onBlur={onBlur} // notify when input is touched
							error={error?.message}
							placeholder="Movement"
							options={[
								{
									value: "in",
									label: "In",
								},
								{
									value: "out",
									label: "Out",
								},
							]}
						/>
					)}
					name="movement"
					control={control}
					rules={{
						required: {
							value: true,
							message: "This field is required",
						},
					}}
				/>
			</div>
			<Button
				className="ml-auto"
				type="success"
				onClick={handleSubmit(save)}
			>
				SAVE
			</Button>
		</AppLayout>
	);
};

export default Dashboard;
