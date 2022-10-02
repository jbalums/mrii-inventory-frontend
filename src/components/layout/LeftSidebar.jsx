import { useRootContext } from "@/src/context/RootContext";
import { BiArrowToLeft } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import FlatIcon from "../FlatIcon";

const LeftSidebarTitle = ({ text }) => {
	return (
		<div className="font-bold text-xs text-placeholder text-center lg:text-left my-2 px-4">
			{text}
		</div>
	);
};
const LeftSidebarLink = ({ icon, text, active, to }) => {
	const {
		theme: { collapseSidebar },
	} = useRootContext();
	return (
		<Link to={to} className="">
			<div
				className={`flex items-center font-normal bg-background h-11 text-dark px-4 duration-100 text-sm group ${
					active ? "!bg-primary text-light !font-bold" : "hover:bg-foreground"
				}`}
			>
				<span className={collapseSidebar ? "ml-2 mr-6" : "mr-4"}>{icon}</span>
				<span
					className={`duration-200 transition-all backdrop-blur ${
						collapseSidebar
							? `opacity-0 min-w-[0px] w-0 group-hover:min-w-[200px] group-hover:opacity-100 group-hover:z-20 flex items-center group-hover:text-dark group-hover:bg-foreground h-full pl-4  ${
									active ? "group-hover:text-light group-hover:!bg-primary" : ""
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
const LeftSidebar = () => {
	const location = useLocation();
	const {
		dispatch,
		theme: { collapseSidebar, device },
	} = useRootContext();
	const isActive = (name) => {
		return location.pathname == name;
	};
	return (
		<div
			className={`shadow-xl transition-all duration-300 bg-background flex flex-col relative md:w-64 z-10 
		${
			collapseSidebar
				? `pt-6 !px-0 !w-[64px] max-w-[64px] ${
						device == "mobile" ? "absolute top-0 left-0" : ""
				  }`
				: `pt-6 px-0 min-w-[240px] ${
						device == "mobile" ? "absolute top-0 left-0" : ""
				  }`
		}`}
		>
			<div
				className={`absolute top-[78px] h-6 w-6 opacity-50 hover:opacity-100 cursor-pointer rounded bg-primary text-white z-20 flex items-center justify-center ${
					collapseSidebar ? "left-[52px]" : "left-[228px]"
				}`}
				onClick={() => {
					dispatch({
						type: "TOGGLE_SIDEBAR",
					});
				}}
			>
				<BiArrowToLeft
					className={`text-2xl duration-200 ${
						collapseSidebar ? "rotate-180" : ""
					}`}
				/>
			</div>
			<div className={collapseSidebar ? "pb-6 px-2" : "pb-6 px-4"}>
				<img
					src={collapseSidebar ? "mrii-icon.png" : "mrii.png"}
					className={`duration-300 ${collapseSidebar ? "h-[44px]" : "h-11"}`}
				/>
			</div>
			<LeftSidebarTitle text="Main menu" />
			<LeftSidebarLink
				icon={<FlatIcon icon="rs-pixabay" />}
				text={`Dashboard`}
				to="/"
				active={isActive("/")}
			/>
			{/* <LeftSidebarLink
                icon={<FlatIcon icon="rr-notebook" />}
                text={`Request order`}
                to="/request-order"
                active={isActive("/request-order")}
            /> */}
			<LeftSidebarLink
				icon={<FlatIcon icon="rr-inbox-in" />}
				text={`Receiving`}
				to="/receiving"
				active={isActive("/receiving")}
			/>
			<LeftSidebarLink
				icon={<FlatIcon icon="rr-boxes" />}
				text={`Inventory`}
				to="/inventory"
				active={isActive("/inventory")}
			/>
			{/* <LeftSidebarLink
				icon={<FlatIcon icon="rr-document" />}
				text={`Reports`}
				to="/reports"
				active={isActive("/reports")}
			/> */}
			<LeftSidebarTitle text="Admin menu" />
			<LeftSidebarLink
				icon={<FlatIcon icon="rr-users-alt" />}
				text={`Users`}
				to="/users"
				active={isActive("/users")}
			/>
			<LeftSidebarLink
				icon={<FlatIcon icon="rr-apps" />}
				text={`Item categories`}
				to="/item-categories"
				active={isActive("/item-categories")}
			/>
			<LeftSidebarLink
				icon={<FlatIcon icon="rs-map-marker" />}
				text={`Locations`}
				to="/locations"
				active={isActive("/locations")}
			/>
			<LeftSidebarLink
				icon={<FlatIcon icon="rs-truck-moving" />}
				text={`Supppliers`}
				to="/suppliers"
				active={isActive("/suppliers")}
			/>
		</div>
	);
};

export default LeftSidebar;
