import { ToastContainer, toast } from "react-toastify";
import React from "react";

const AppLayout = (props) => {
	return (
		<div
			className={`antialiased h-screen w-screen max-h-screen overflow-auto bg-slate-100`}
		>
			{props.children}
			<ToastContainer />
		</div>
	);
};

export default AppLayout;
