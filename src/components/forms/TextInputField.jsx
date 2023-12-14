import { forwardRef } from "react";

const TextInputField = (props, ref) => {
	const {
		type,
		label,
		className = "",
		inputClassName = "",
		register,
		error,
		icon,
		iconClassName = "",
		labelClassName = "",
		...rest
	} = props;
	return (
		<label
			className={`flex flex-col ${className || ""} ${
				error ? "text-danger" : ""
			}`}
		>
			{label ? (
				<span
					className={`text-sm mb-1 font-roboto font-[600] ${labelClassName}`}
				>
					{label}
				</span>
			) : (
				""
			)}
			<div className="w-full relative flex items-center">
				{icon ? (
					<div
						className={`absolute left-0 flex items-center justify-center py-2 px-3 border-r text-darker border-border ${iconClassName}`}
					>
						{icon}
					</div>
				) : (
					""
				)}
				<input
					ref={ref || register}
					{...rest}
					type={type || "text"}
					className={`bg-white !border border-gray-300 py-3 text-sm text-dark sm:text-sm rounded-lg focus:ring-1 focus:shadow duration-100 shadow-blue-300 focus:ring-blue-500 block w-full p-2.5 ${
						error ? "!border-danger text-danger" : ""
					}  ${icon ? "!pl-12" : ""} ${
						inputClassName ? inputClassName : ""
					}`}
				/>
			</div>
			{error ? <span className="text-danger text-sm">{error}</span> : ""}
		</label>
	);
};

export default forwardRef(TextInputField);
