const FlatIcon = (props) => {
	const { className = "", icon, ...rest } = props;
	return <i className={`fi fi-${icon} ${className}`} {...rest}></i>;
};

export default FlatIcon;
