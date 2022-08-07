const LayoutContainer = ({ children }) => {
	return (
		<div className="h-screen w-screen max-h-screen overflow-auto flex bg-slate-200">
			{children}
		</div>
	);
};

export default LayoutContainer;
