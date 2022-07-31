import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import LoginForm from "../features/authentication/components/LoginForm";

const Login = () => {
	return (
		<AppLayout>
			<LoginForm />
		</AppLayout>
	);
};

export default Login;
