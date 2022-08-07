import { ToastContainer, toast } from "react-toastify";
import React from "react";
import LeftSidebar from "./layout/LeftSidebar";
import PageHeader from "./layout/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import Header from "./layout/Header";

const AppLayout = (props) => {
	const { title } = props;

	const { user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});

	return (
		<div
			className={`antialiased h-screen w-screen max-h-screen overflow-auto bg-slate-100 flex flex-col`}
		>
			<Header />
			<div className="w-full flex h-full">
				<LeftSidebar user={user} />

				<div className="relative bg-slate-100 h-full w-full">
					<PageHeader title={title} />
					<div className="p-6 w-full">{props.children}</div>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
};

export default AppLayout;
