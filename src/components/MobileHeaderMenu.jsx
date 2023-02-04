import { useState } from "react";
import FlatIcon from "./FlatIcon";

const MobileHeaderMenu = ({ children }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="flex md:hidden ml-auto ">
				<div
					className="rounded-lg bg-slate-100 border border-border p-1 w-11 h-11 flex items-center justify-center"
					onClick={() => {
						setOpen((val) => !val);
					}}
				>
					<FlatIcon icon="rr-menu-burger" className="text-lg" />
				</div>
			</div>
			<div
				className={`duration-200 fixed overflow-hidden top-[76px] border-t border-l border-b right-0 gap-y-4 bg-foreground h-[calc(100vh-77px)] min-w-0 w-0 flex flex-col ${
					open ? "w-[calc(100vw-64px)] px-6 py-4" : " p-0"
				}`}
			>
				{children}
			</div>
		</>
	);
};

export default MobileHeaderMenu;
