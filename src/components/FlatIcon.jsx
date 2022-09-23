const FlatIcon = (props) => {
	const { className = "", icon, ...rest } = props;
	return <i className={`fi -mb-[6px] fi-${icon} ${className}`} {...rest}></i>;
};

export default FlatIcon;
