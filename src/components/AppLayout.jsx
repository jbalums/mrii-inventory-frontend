import { ToastContainer, toast } from "react-toastify";
import React from "react";
import LeftSidebar from "./layout/LeftSidebar";
import PageHeader from "./layout/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import Header from "./layout/Header";

const AppLayout = (props) => {
	const { title, titleChildren, children } = props;

	const { user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});

	return (
		<div
			className={`antialiased h-screen w-screen max-h-screen overflow-auto bg-slate-100 flex flex-col`}
		>
			<div className="w-full flex h-full">
				<LeftSidebar user={user} />

				<div className="relative bg-foreground h-full w-full">
					<PageHeader title={title}>{titleChildren}</PageHeader>
					<div className="p-6 w-full">{children}</div>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
};

export default AppLayout;
