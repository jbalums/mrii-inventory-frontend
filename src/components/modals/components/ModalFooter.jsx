const ModalFooter = ({ children, className }) => {
	return <div className={`p-4 ${className ? className : ""}`}>{children}</div>;
};

export default ModalFooter;
