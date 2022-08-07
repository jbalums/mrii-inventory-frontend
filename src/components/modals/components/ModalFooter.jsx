const ModalFooter = ({ children, className }) => {
	return <div className={`mt-4 ${className ? className : ""}`}>{children}</div>;
};

export default ModalFooter;
