const LoadingMsg = ({ text = "Loading..." }) => {
	return <div className="flex items-center">{text}</div>;
};
const LinkBtn = () => {
	return <a {...props}>{props?.children}</a>;
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

	const defaultBtnClass = `text-center !duration-200 !transition-all hover:shadow-md transition-transform rounded-xl sm:w-auto cursor-pointer flex items-center justify-center hover:!bg-blend-darken text-sm`;

	const btnBg = () => {
		switch (type) {
			case "primary":
				return `text-white bg-primary`;
			case "primary-gradient":
				return `text-white  btn-primary-gradient`;
			case "primary-light":
				return `text-primary bg-primary bg-opacity-10`;

			case "secondary":
				return `text-white bg-secondary`;
			case "secondary-dark":
				return `text-white bg-secondary-dark`;

			case "secondary-light":
				return `text-secondary bg-secondary bg-opacity-10`;
			case "tertiary":
				return `text-dark bg-tertiary`;
			case "tertiary-light":
				return `text-tertiary bg-tertiary bg-opacity-10`;
			case "accent":
				return `text-white bg-accent`;
			case "accent-light":
				return `text-accent bg-accent bg-opacity-10`;
			case "danger":
				return `text-white bg-danger`;
			case "danger-light":
				return `!text-danger bg-danger bg-opacity-10`;
			case "success":
				return `text-white bg-success`;
			case "success-light":
				return `text-success bg-success bg-opacity-10`;
			case "warning":
				return `text-white bg-warning`;
			case "warning-light":
				return `text-warning bg-warning bg-opacity-10`;
			case "background":
				return `text-dark bg-background`;
			case "foreground":
				return `text-dark bg-foreground`;
			case "transparent":
				return `text-secondaryText bg-transparent`;
			default:
				return `text-white bg-primary`;
		}
	};

	const btnSize = () => {
		switch (size) {
			case "sm":
				return "p-2 text-xs text-xs";
			case "md":
				return "p-3 text-sm font-light";
			case "square-sm":
				return "!w-[30px] h-[30px] text-xs text-xs flex items-center justify-center";
			case "square-md":
				return "!w-[44px] h-[44px] text-xs text-xs flex items-center justify-center";
			default:
				return "p-3 text-sm font-light";
		}
	};

	return props?.href ? (
		<LinkBtn
			className={`${defaultBtnClass} ${btnBg()} ${btnSize()} ${
				className || ""
			} ${
				loading
					? "disabled opacity-50 cursor-wait pointer-events-none animate-pulse"
					: ""
			} ${
				disabled
					? "disabled pointer-events-none grayscale text-dark opacity-40 cursor-not-allowed"
					: ""
			}`}
			{...rest}
		>
			{loading ? <LoadingMsg text={loadingMessage} /> : children}{" "}
		</LinkBtn>
	) : (
		<div
			className={`${defaultBtnClass} ${btnBg()} ${btnSize()} ${
				className || ""
			} ${
				loading
					? "disabled opacity-50 cursor-wait pointer-events-none animate-pulse"
					: ""
			} ${
				disabled
					? "disabled pointer-events-none grayscale text-dark opacity-40 cursor-not-allowed"
					: ""
			}`}
			{...rest}
		>
			{loading ? <LoadingMsg text={loadingMessage} /> : children}
		</div>
	);
};

export default Button;
