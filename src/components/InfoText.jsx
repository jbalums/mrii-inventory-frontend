import ClickToCopy from "./ClickToCopy";

const Infotext = ({
	label,
	text,
	className = "",
	titleClassName = "",
	valueClassName = "",
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
			<label
				className={`text-xs text-placeholder font-regular mb-1 ${titleClassName}`}
			>
				{label}
			</label>
			<span className={`text-sm text-dark font-bold ${valueClassName}`}>
				{typeof text === "string" || typeof text === "number" ? (
					<ClickToCopy text={text || <>&nbsp;</>} />
				) : (
					text || <>&nbsp;</>
				)}
			</span>
		</div>
	);
};

export default Infotext;
