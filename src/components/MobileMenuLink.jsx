import { Link } from "react-router-dom";
import { useRootContext } from "../context/RootContext";

const MobileMenuLink = ({ icon, text, active, to, onClick }) => {
	const {
		theme: { collapseSidebar },
	} = useRootContext();
	return (
		<Link to={to} className="" onClick={onClick}>
			<div
				className={`flex flex-col md:flex-row items-center justify-center md:justify-start aspect-square font-normal !py-4 bg-background text-dark px-4 !duration-200 text-sm group border border-border rounded-xl h-full ${
					active
						? "!border-secondary-dark !text-secondary-dark bg-white !font-semibold "
						: "hover:bg-white hover:border-secondary-dark hover:text-secondary-dark bg-opacity-0 hover:bg-opacity-100"
				}`}
			>
				<span className={`text-2xl `}>{icon}</span>
				<span
					className={`duration-200 transition-all text-center text-xs ${
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
