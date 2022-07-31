import Button from "../../../components/Button";
import CheckBoxField from "../../../components/forms/CheckBoxField";
import TextInputField from "../../../components/forms/TextInputField";
import CardLayout from "../../../components/layout/CardLayout";
import {useForm} from "react-hook-form";
import {useAuth} from "@/hooks/useAuth";
import {useState} from "react";

const LoginForm = () => {
  const {register, handleSubmit,setError,clearErrors} = useForm()
  const [status,setStatus] = useState(null)
  const { login} = useAuth()

  const submit = (data) => {
    clearErrors()
    login({...data,setStatus,setErrors})
  }

  const setErrors = (data) => {
    console.log('errors',data)
  }

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <h1 className="mb-6">Mactan Rock Industries, INC.</h1>
      <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:3/4 mx-auto">
        <CardLayout className="flex flex-col">
          <h2 className="mb-6">Sign in</h2>
          <TextInputField
            className="mb-6"
            label={`Your Username or Email`}
            placeholder={"Enter your username/email"}
            {...register("email")}
          />
          <TextInputField
            className="mb-6"
            type="password"

            label={`Your Password`}
            placeholder={"Enter your email or username"}
            {...register("password")}
          />
          <div className="flex w-full">
            <CheckBoxField className="mb-6" label="Remember me" />
            <a href="" className="text-blue-500 ml-auto">
              Lost password?
            </a>
          </div>
          <Button className="mb-2" onClick={handleSubmit(submit)}>Login to your account</Button>
        </CardLayout>
      </div>
    </div>
  );
};

export default LoginForm;
