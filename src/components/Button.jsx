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

	const defaultBtnClass = `text-center shadow-sm !duration-200 !transition-all hover:shadow-md transition-transform rounded-xl sm:w-auto cursor-pointer flex items-center justify-center hover:!bg-blend-darken text-xs md:text-sm gap-1 md:gap-2`;

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
			case "secondary-dark-outline":
				return `text-secondary-dark border border-secondary md:border-0`;

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
			case "danger-outline":
				return `text-danger border border-danger md:border-0`;
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
				return `text-secondaryText bg-transparent border border-black-500`;
			default:
				return `text-white bg-primary`;
		}
	};

	const btnSize = () => {
		switch (size) {
			case "xs":
				return "p-1 text-xs font-light";
			case "sm":
				return "p-2";
			case "md":
				return "p-3 text-sm font-light min-w-[64px]";
			case "square-sm":
				return "!w-[30px] h-[30px] text-xs text-xs flex items-center justify-center";
			case "square-md":
				return "!w-[44px] h-[44px] text-xs text-xs flex items-center justify-center";
			case "lg":
				return "h-[66px] py-3 px-5 text-lg text-xs flex items-center justify-center";
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
			role="button"
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
