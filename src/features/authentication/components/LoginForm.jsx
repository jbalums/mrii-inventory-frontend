import Button from "../../../components/Button";
import CheckBoxField from "../../../components/forms/CheckBoxField";
import TextInputField from "../../../components/forms/TextInputField";
import CardLayout from "../../../components/layout/CardLayout";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [status, setStatus] = useState(null);
	const { login } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/",
	});

	const submit = async (data) => {
		console.log("datadata", data);
		clearErrors();
		try {
			await login({ ...data, setStatus, setErrors });
			console.log("status", status);
			if (status == 422) {
				throw exception;
			} else {
				toast.success("Login success");
			}
		} catch {
			toast.error("Please check your credentials.");
		}
	};

	const setErrors = (data) => {
		console.log("errorserrors", data);
	};

	const onEnter = (event) => {
		if (event.key === "Enter") {
			document.getElementById("submit-btn").click();
		}
	};

	return (
		<div className="h-full w-full flex items-center justify-center flex-col">
			{console.log("errorserrors", errors)}
			<h1 className="mb-6">Mactan Rock Industries, INC.</h1>
			<div className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:3/4 mx-auto">
				<CardLayout className="flex flex-col">
					<h2 className="mb-6">Sign in</h2>
					<TextInputField
						className="mb-6"
						label={`Your Username`}
						placeholder={"Enter your username"}
						id="username"
						name="username"
						error={errors?.username?.message}
						onKeyUp={onEnter}
						{...register("username", {
							required: "This field is required",
						})}
					/>
					<TextInputField
						className="mb-6"
						type="password"
						label={`Your Password`}
						placeholder={"Enter your email or username"}
						id="password"
						name="password"
						error={errors?.password?.message}
						onKeyUp={onEnter}
						{...register("password", {
							required: "This field is required",
						})}
					/>
					<div className="flex w-full">
						<CheckBoxField className="mb-6" label="Remember me" />
						<a href="" className="text-blue-500 ml-auto">
							Lost password?
						</a>
					</div>
					<Button
						className="mb-2"
						id="submit-btn"
						onClick={handleSubmit(submit)}
					>
						Login to your account
					</Button>
				</CardLayout>
			</div>
		</div>
	);
};

export default LoginForm;
