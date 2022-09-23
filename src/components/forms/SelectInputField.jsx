import { forwardRef } from "react";

const SelectInputField = (props, ref) => {
	const {
		type = "text",
		label,
		className = "",
		inputClassName = "",
		register,
		options,
		error,
		...rest
	} = props;
	return (
		<div
			className={`flex flex-col ${className || ""} ${
				error ? "text-danger" : ""
			}`}
		>
			{label ? <label className="text-sm mb-2">{label}</label> : ""}
			<div className="w-full relative">
				<select
					ref={ref || register}
					{...rest}
					className={`border py-3 border-transparent text-sm text-dark sm:text-sm rounded-lg focus:ring-1 focus:shadow-lg duration-100 shadow-blue-300 focus:ring-blue-500 block w-full p-2.5 ${
						error ? "border-danger text-danger" : ""
					}  ${inputClassName ? inputClassName : ""}`}
				>
					{options.map((option, index) => {
						return (
							<option
								key={`option-${Math.random(100)}-${index}-${option.value}`}
								value={option.value}
							>
								{option.label}
							</option>
						);
					})}
				</select>
			</div>
			{error ? <span className="text-danger text-sm">{error}</span> : ""}
		</div>
	);
};

export default forwardRef(SelectInputField);
