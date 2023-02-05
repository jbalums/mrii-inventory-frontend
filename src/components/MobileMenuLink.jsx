import { Link } from "react-router-dom";
import { useRootContext } from "../context/RootContext";

const MobileMenuLink = ({ icon, text, active, to, onClick }) => {
	const {
		theme: { collapseSidebar },
	} = useRootContext();
	return (
		<Link to={to} className="" onClick={onClick}>
			<div
				className={`flex flex-col md:flex-row items-center justify-center md:justify-start aspect-[3/2] font-normal !py-4 bg-background text-dark px-4 !duration-200 text-sm group border border-border rounded-xl ${
					active
						? "!border-secondary !text-secondary bg-white !font-semibold "
						: "hover:bg-foreground bg-opacity-0 hover:bg-opacity-100"
				}`}
			>
				<span className={`text-lg `}>{icon}</span>
				<span
					className={`duration-200 transition-all text-xs ${
						active
							? "group-hover:text-light group-hover:!bg-primary"
							: ""
					}`}
				>
					{text}
				</span>
			</div>
		</Link>
	);
};
export default MobileMenuLink;
