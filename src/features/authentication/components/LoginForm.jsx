import { useAuth } from "@/hooks/useAuth";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import CheckBoxField from "../../../components/forms/CheckBoxField";
import TextInputField from "../../../components/forms/TextInputField";
import CardLayout from "../../../components/layout/CardLayout";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(false);

	const { login } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/dashboard",
	});

	const submit = async (data) => {
		setLoading(true);
		clearErrors();
		try {
			await login({ ...data, setStatus, setErrors });
			console.log("status", status);
			if (status == 422) {
				throw exception;
			}
		} catch {
			setLoading(false);
			toast.error("Please check your credentials.");
		}
	};

	const setErrors = (data) => {
		console.log("errorserrors", data);
		setError("username", {
			type: "manual",
			message: "The provided credentials are incorrect.",
		});
		setLoading(false);
	};

	const onEnter = (event) => {
		if (event.key === "Enter") {
			document.getElementById("submit-btn").click();
		}
	};

	return (
		<>
			<div className="flex items-center flex-col justify-start lg:justify-center w-full lg:w-1/2 lg:h-full z-20">
				<div className="flex items-center justify-center mb-4 lg:mb-6">
					<img
						src="/logo-bw.png"
						className="h-14 lg:h-20"
						style={{ filter: "drop-shadow(0px 0px 20px #000130)" }}
					/>
				</div>
				<span className="text-base lg:text-lg font-bold text-white tracking-wide mb-10 lg:mb-20 text-center">
					Manufacturer of Water Treatment Chemicals & Equipment
				</span>
			</div>
			<div className="bg-blue-50 bg-opacity-10 rounded-xl max-w-lg w-full px-6 py-8 lg:p-11 shadow flex flex-col z-20">
				<h3 className="text-white font-bold text-xl lg:text-3xl text-left lg:text-center mb-0">
					Login
				</h3>
				<hr className=" border-opacity-25 border-white lg:border-none mt-2 mb-2 block lg:hidden w-2/3" />
				<p className="text-sm lg:text-base text-white text-left lg:text-center mb-6">
					Fill up credentials to login
				</p>
				<TextInputField
					labelClassName={"text-white"}
					className="mb-6"
					label={`Username`}
					placeholder={"Enter username"}
					id="username"
					name="username"
					inputClassName="bg-foreground !border"
					error={errors?.username?.message}
					onKeyUp={onEnter}
					{...register("username", {
						required: "This field is required",
					})}
				/>
				<TextInputField
					labelClassName={"text-white"}
					className="mb-6"
					type="password"
					label={`Password`}
					placeholder={"Enter password"}
					id="password"
					name="password"
					inputClassName="bg-foreground !border"
					error={errors?.password?.message}
					onKeyUp={onEnter}
					{...register("password", {
						required: "This field is required",
					})}
				/>
				{/* <a href="/" className="text-blue-400 mb-6">
				Forgot password?
			</a> */}
				<div className="flex flex-col">
					<Button
						type="secondary-dark"
						className="mb-2 tracking-wider"
						id="submit-btn"
						loading={loading}
						onClick={handleSubmit(submit)}
					>
						LOGIN
					</Button>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
