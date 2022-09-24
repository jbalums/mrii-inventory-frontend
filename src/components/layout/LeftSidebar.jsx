import { useRootContext } from "@/src/context/RootContext";
import { BiArrowToLeft } from "react-icons/bi";
import { FiFileText, FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import FlatIcon from "../FlatIcon";

const LeftSidebarTitle = ({ text }) => {
    return (
        <div className="font-bold text-xs text-placeholder my-2 px-4">
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
                className={`flex items-center font-normal bg-background text-dark px-4 py-3 duration-100 text-sm ${
                    active
                        ? "!bg-primary text-light !font-bold"
                        : "hover:bg-primary hover:bg-opacity-20"
                }`}
            >
                <span className="pt-[2.5px]">{icon}</span>
                <span className={`duration-200 transition-all`}>{text}</span>
            </div>
        </Link>
    );
};
const LeftSidebar = () => {
    const location = useLocation();
    const {
        dispatch,
        theme: { collapseSidebar },
    } = useRootContext();
    const isActive = (name) => {
        return location.pathname == name;
    };
    return (
        <div
            className={`shadow-xl transition-all duration-300 bg-background flex flex-col relative md:w-64 z-10 
		${
            collapseSidebar
                ? "pt-6 px-0 !w-[64px] max-w-[64px]"
                : "pt-6 px-0 min-w-[240px]"
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
            <div className="pb-6  mx-4">
                <img
                    src={collapseSidebar ? "mrii-icon.png" : "mrii.png"}
                    className={`duration-300 ${
                        collapseSidebar ? "h-[44px]" : "h-11"
                    }`}
                />
            </div>
            <LeftSidebarTitle text="Main menu" />
            <LeftSidebarLink
                icon={<FlatIcon icon="rs-pixabay" className="mr-4" />}
                text={`Dashboard`}
                to="/"
                active={isActive("/")}
            />
            <LeftSidebarLink
                icon={<FlatIcon icon="rr-notebook" className="mr-4" />}
                text={`Request order`}
                to="/request-order"
                active={isActive("/request-order")}
            />
            <LeftSidebarLink
                icon={<FlatIcon icon="rr-inbox-in" className="mr-4" />}
                text={`Receiving`}
                to="/receiving"
                active={isActive("/receiving")}
            />
            <LeftSidebarLink
                icon={<FlatIcon icon="rr-boxes" className="mr-4" />}
                text={`Inventory`}
                to="/inventory"
                active={isActive("/inventory")}
            />
            <LeftSidebarLink
                icon={<FiFileText className="w-5 mr-1" />}
                text={`Reports`}
                to="/reports"
                active={isActive("/reports")}
            />
            <LeftSidebarTitle text="Admin menu" />
            <LeftSidebarLink
                icon={<FiUsers className="w-5 mr-1" />}
                text={`Users`}
                to="/users"
                active={isActive("/users")}
            />
            <LeftSidebarLink
                icon={<FiFileText className="w-5 mr-1" />}
                text={`Item categories`}
                to="/item-categories"
                active={isActive("/item-categories")}
            />
            <LeftSidebarLink
                icon={<FlatIcon icon="rs-map-marker" className="w-5 mr-2" />}
                text={`Locations`}
                to="/locations"
                active={isActive("/locations")}
            />
            <LeftSidebarLink
                icon={<FlatIcon icon="rs-truck-moving" className="w-5 mr-2" />}
                text={`Supppliers`}
                to="/suppliers"
                active={isActive("/suppliers")}
            />
        </div>
    );
};

export default LeftSidebar;
