const ModalBody = ({ className, children }) => {
	return (
		<div className={`p-4 bg-background ${className ? className : ""}`}>
			{children}
		</div>
	);
};

export default ModalBody;
