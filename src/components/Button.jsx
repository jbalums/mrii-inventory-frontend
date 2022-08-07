const LoadingMsg = ({ text = "Loading..." }) => {
	return <div className="flex items-center">{text}</div>;
};
const Button = (props) => {
	const {
		type = "primary",
		size = "md",
		className,
		children,
		loading,
		loadingMessage,
		...rest
	} = props;

	const defaultBtnClass = `text-center duration-50 hover:shadow-md hover:shadow-gray-300 transition-transform rounded-lg sm:w-auto cursor-pointer flex items-center justify-center`;

	const btnBg = () => {
		switch (type) {
			case "primary":
				return `text-white bg-gradient-to-br from-blue-500 to-blue-900`;
			case "danger":
				return `text-white bg-gradient-to-br from-red-500 to-red-900`;
			case "success":
				return `text-white bg-gradient-to-br from-green-500 to-green-900`;
			case "warning":
				return `text-white bg-gradient-to-br from-yellow-400 to-orange-500`;
			case "transparent":
				return `text-secondaryText bg-transparent`;

			default:
				break;
		}
	};

	const btnSize = () => {
		switch (size) {
			case "sm":
				return "p-2 w-full text-base text-sm font-bold";

			case "md":
				return "py-3 px-5 w-full text-base font-semibold";

			default:
				break;
		}
	};

	return (
		<div
			className={`${defaultBtnClass} ${btnBg()} ${btnSize()} ${
				className || ""
			} ${
				loading
					? "disabled opacity-50 cursor-wait pointer-events-none animate-pulse"
					: ""
			}`}
			{...rest}
		>
			{loading ? <LoadingMsg text={loadingMessage} /> : children}
		</div>
	);
};

export default Button;
