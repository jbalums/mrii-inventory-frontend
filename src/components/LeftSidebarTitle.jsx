const LeftSidebarTitle = ({ collapseSidebar, className = "", text }) => {
	return (
		<div
			className={`font-semibold text-xs text-dark tracking-wide my-2 px-4 ${className} ${
				collapseSidebar ? "text-center" : " text-left"
			}`}
		>
			{text}
		</div>
	);
};

export default LeftSidebarTitle;
