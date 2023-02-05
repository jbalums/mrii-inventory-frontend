import { Link } from "react-router-dom";
import { useRootContext } from "../context/RootContext";

const LeftSidebarLink = ({ icon, text, active, to, onClick }) => {
	const {
		theme: { collapseSidebar },
	} = useRootContext();
	return (
		<Link to={to} className="" onClick={onClick}>
			<div
				className={`flex flex-col md:flex-row items-center justify-center md:justify-start font-normal bg-background  h-11 text-dark px-4 !duration-200 text-sm group ${
					active
						? "!bg-primary text-light !font-semibold bg-opacity-100"
						: "hover:bg-foreground bg-opacity-0 hover:bg-opacity-100"
				}`}
			>
				<span
					className={`text-lg ${
						collapseSidebar ? "ml-2 mr-3" : "mr-2"
					}`}
				>
					{icon}
				</span>
				<span
					className={`duration-200 transition-all ${
						collapseSidebar
							? `opacity-0 min-w-[0px] w-0 overflow-hidden group-hover:min-w-[200px] group-hover:opacity-100 group-hover:z-20 flex items-center group-hover:text-dark group-hover:bg-foreground h-full pl-4  ${
									active
										? "group-hover:text-light group-hover:!bg-primary"
										: ""
							  }`
							: ""
					}`}
				>
					{text}
				</span>
			</div>
		</Link>
	);
};
export default LeftSidebarLink;
