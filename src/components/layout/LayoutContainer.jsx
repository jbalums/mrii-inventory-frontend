const LayoutContainer = ({ children }) => {
	return (
		<div className="h-screen w-screen max-h-screen overflow-auto flex">
			{children}
		</div>
	);
};

export default LayoutContainer;
