const ModalBody = ({ className, children }) => {
	return <div className={`mt-2 ${className ? className : ""}`}>{children}</div>;
};

export default ModalBody;
