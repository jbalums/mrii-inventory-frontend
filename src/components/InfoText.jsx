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
				{text || <>&nbsp;</>}
			</span>
		</div>
	);
};

export default Infotext;
