const TextInputField = (props) => {
	const {
		type = "text",
		label,
		className = "",
		inputClassName = "",
		ref,
		register,
		error,
		...rest
	} = props;
	return (
		<div
			className={`flex flex-col ${className || ""} ${
				error ? "text-red-500" : ""
			}`}
		>
			{label ? <label className="text-base mb-2">{label}</label> : ""}
			<input
				type={type}
				ref={register || ref}
				{...rest}
				className={`border py-3 border-gray-300 text-base text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:shadow-lg duration-100 shadow-blue-300 focus:ring-blue-500 block w-full p-2.5`}
			/>
		</div>
	);
};

export default TextInputField;
