import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import HomeLayout from "../components/layout/HomeLayout";
import LayoutContainer from "../components/layout/LayoutContainer";
import LoginForm from "../features/authentication/components/LoginForm";

const Login = () => {
	return (
		<LayoutContainer>
			<LoginForm />
		</LayoutContainer>
	);
};

export default Login;
