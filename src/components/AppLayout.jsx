import { useAuth } from "@/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { RootContextWrapper } from "../context/RootContext";
import LeftSidebar from "./layout/LeftSidebar";
import PageHeader from "./layout/PageHeader";

import { Navigate } from "react-router-dom";
const Page = (props) => {
	const { user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	const {
		title,
		titleChildren,
		children,
		backBtn = false,
		containerClassName = "",
	} = props;

	return (
		<RootContextWrapper>
			<div
				className={`antialiased h-screen min-h-[720px] w-screen max-h-screen overflow-auto bg-slate-100 flex flex-col`}
			>
				<div className="w-full flex h-full ">
					<LeftSidebar user={user} />

					<div className="relative bg-foreground h-full w-full max-h-screen overflow-auto">
						<PageHeader title={title} backBtn={backBtn}>
							{titleChildren}
						</PageHeader>
						<div
							className={`p-4 lg:p-6 w-full ${containerClassName}`}
						>
							{children}
						</div>
					</div>
					<ToastContainer />
				</div>
			</div>
		</RootContextWrapper>
	);
};
const AppLayout = (props) => {
	const { user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	return user?.data?.id ? (
		<Page {...props} />
	) : (
		<Navigate to="/login" replace={true} />
	);
};

export default AppLayout;
