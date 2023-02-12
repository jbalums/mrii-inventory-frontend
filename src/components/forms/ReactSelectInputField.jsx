import { forwardRef } from "react";
import Select, { components } from "react-select";

const customStyles = {
	option: (provided, state) => {
		return {
			...provided,
			cursor: "pointer",
			color: state.isSelected ? "red" : "blue",
		};
	},
	control: () => ({
		// none of react-select's styles are passed to <Control />
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";
		return { ...provided, opacity, transition };
	},
};

const Control = ({ children, ...props }) => (
	<components.Control {...props} name="sample">
		<div
			className={`${props.selectProps?.controlClassName} flex flex-row border`}
		>
			{children}
		</div>
	</components.Control>
);

const ReactSelectInputField = (props, ref) => {
	const {
		className,
		inputClassName,
		label,
		id,
		value,
		icon,
		options,
		iconClassName,
		selectClassName = "",
		placeholder,
		error,
		onChange,
		onChangeGetData,
		isLoading,
		isClearable = true,
		loading = false,
		...rest
	} = props;
	return (
		<label className={`${className}  text-sm`}>
			{label && (
				<span className={error ? "text-danger" : "text-dark"}>
					{label}
				</span>
			)}

			{icon && <span className={` ${iconClassName}`}>{icon}</span>}

			{loading ? (
				<div
					className={`${
						label && "mt-2"
					} h-11 bg-slate-200 animate-pulse`}
				/>
			) : (
				<Select
					styles={customStyles}
					ref={ref}
					id={id}
					isClearable={isClearable}
					value={
						value
							? options.find((item) => item.value === value)
							: ""
					}
					classNamePrefix="react-select"
					className={`react-select-container text-sm ${selectClassName}`}
					controlClassName={`text-sm flex flex-row  duration-200 ${
						icon && "pl-7"
					} ${error ? "error-input" : "default-input"} ${
						label && "mt-2"
					} ${inputClassName}`}
					onChange={(val) => {
						console.log("valval", val);
						if (onChange) onChange(val?.value || "");
						if (onChangeGetData) onChangeGetData(val);
					}}
					options={options}
					placeholder={placeholder}
					components={{ Control }}
					isLoading={isLoading}
					{...rest}
				/>
			)}

			{error && <div className="text-red-500 pt-1">{error}</div>}
		</label>
	);
};
export default forwardRef(ReactSelectInputField);
