import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
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
        redirectIfAuthenticated: "/",
    });

    const submit = async (data) => {
        setLoading(true);
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
        <div
            className="bg-white w-full bg-no-repeat max-h-screen overflow-auto"
            style={{
                // background: "url(/login-bg.jpg)",
                backgroundSize: "70% 100%",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="flex flex-wrap flex-row">
                <span className="fixed bg-blue-900 bg-opacity-20 w-full h-full inset-x-0 top-0" />
                <div className="flex-shrink max-w-full w-full min-h-screen sm:w-2/3 lg:w-1/2 xl:w-1/3 z-30">
                    {/* login form */}
                    <div className="max-w-full w-full h-full px-2 lg:px-6 bg-white bg-opacity-20 shadow-lg z-40 flex lg:items-center justify-center py-11">
                        <div className="relative w-full">
                            <div className="p-6 sm:p-8">
                                <div className="text-center">
                                    <a className="py-2 text-2xl" href="#">
                                        <h2 className="font-semibold text-gray-200 px-4">
                                            <img
                                                className="inline-block h-11 ltr:mr-2 rtl:ml-2 -mt-1"
                                                src="logo.png"
                                            />
                                        </h2>
                                    </a>
                                </div>
                                <hr className="block w-2/3 h-[1px] mx-auto mb-11 mt-11 bg-primary " />
                                <CardLayout className="flex flex-col shadow-none !bg-slate-50 border">
                                    <h2 className="mb-6">Sign in</h2>
                                    <TextInputField
                                        className="mb-6"
                                        label={`Your Username`}
                                        placeholder={"Enter your username"}
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
                                        className="mb-6"
                                        type="password"
                                        label={`Your Password`}
                                        placeholder={
                                            "Enter your email or username"
                                        }
                                        id="password"
                                        name="password"
                                        inputClassName="bg-foreground !border"
                                        error={errors?.password?.message}
                                        onKeyUp={onEnter}
                                        {...register("password", {
                                            required: "This field is required",
                                        })}
                                    />
                                    <div className="flex w-full flex-col gap-2 lg:flex-row">
                                        <CheckBoxField
                                            className="lg:mb-6"
                                            label="Remember me"
                                        />
                                        <a
                                            href=""
                                            className="mb-6 text-blue-500 lg:ml-auto"
                                        >
                                            Lost password?
                                        </a>
                                    </div>
                                    <Button
                                        className="mb-2"
                                        id="submit-btn"
                                        loading={loading}
                                        onClick={handleSubmit(submit)}
                                    >
                                        Log-in to your account
                                    </Button>
                                </CardLayout>
                            </div>

                            <p className="text-center mb-0">
                                Don't have an account?{" "}
                                <a
                                    className="text-blue-500 font-semibold hover:text-indigo-500"
                                    href="register-cover.html"
                                >
                                    Register
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
