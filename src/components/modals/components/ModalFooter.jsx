const ModalFooter = ({ children, className }) => {
	return (
		<div className={`p-4 ${className ? className : ""} last:border-t`}>
			{children}
		</div>
	);
};

export default ModalFooter;
