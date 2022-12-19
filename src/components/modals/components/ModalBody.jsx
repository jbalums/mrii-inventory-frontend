const ModalBody = ({ className, children }) => {
	return (
		<div
			className={`p-4 bg-background last:rounded-b-xl ${
				className ? className : ""
			}`}
		>
			{children}
		</div>
	);
};

export default ModalBody;
