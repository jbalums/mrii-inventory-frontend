const LoadingMsg = ({ text = "Loading..." }) => {
	return <div className="flex items-center">{text}</div>;
};
const Button = (props) => {
	const {
		type = "primary",
		size = "md",
		className,
		children,
		disabled,
		loading,
		loadingMessage,
		...rest
	} = props;

	const defaultBtnClass = `text-center !duration-200 !transition-all hover:shadow-md hover:shadow-gray-300 transition-transform rounded-lg sm:w-auto cursor-pointer flex items-center justify-center hover:!bg-blend-darken text-sm`;

	const btnBg = () => {
		switch (type) {
			case "foreground":
				return `text-darker bg-gradient-to-br from-foreground to-background border border-border`;
			case "background":
				return `text-darker bg-gradient-to-br from-background to-foreground border border-border`;
			case "primary-gradient":
				return `text-white bg-gradient-to-br from-blue-500 to-blue-900`;
			case "danger-gradient":
				return `text-white bg-gradient-to-br from-red-500 to-red-900`;
			case "success-gradient":
				return `text-white bg-gradient-to-br from-green-500 to-green-900`;
			case "warning-gradient":
				return `text-white bg-gradient-to-br from-yellow-400 to-orange-500`;
			case "primary":
				return `text-white bg-primary`;
			case "danger":
				return `text-white bg-danger`;
			case "success":
				return `text-white bg-success`;
			case "warning":
				return `text-white bg-warning`;
			case "accent":
				return `text-white bg-accent`;
			case "transparent":
				return `text-secondaryText bg-transparent`;

			default:
				break;
		}
	};

	const btnSize = () => {
		switch (size) {
			case "sm":
				return "p-2 w-full text-base text-xs font-bold";

			case "md":
				return "py-3 px-5 w-full text-sm font-normal";

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
			} ${disabled ? "disabled grayscale opacity-60 cursor-not-allowed" : ""}`}
			{...rest}
		>
			{loading ? <LoadingMsg text={loadingMessage} /> : children}
		</div>
	);
};

export default Button;
