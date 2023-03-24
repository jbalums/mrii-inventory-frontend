import { useEffect, useState } from "react";
import FlatIcon from "./FlatIcon";

const CollapseMenu = ({
	className = "",
	titleClassName = "",
	containerClassName = "",
	titleOpenClassName = "",
	title,
	titleOnClick,
	children,
	hideArrow = false,
	defaultOpen = false,
}) => {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setOpen(defaultOpen);
	}, [defaultOpen]);
	return (
		<div className={className}>
			<div
				className={`${titleClassName} ${open && titleOpenClassName}`}
				onClick={() => {
					setOpen((open) => !open);
					if (titleOnClick) {
						titleOnClick();
					}
				}}
			>
				{title}{" "}
				{hideArrow ? (
					""
				) : (
					<>
						{open ? (
							<FlatIcon
								className="ml-auto"
								icon="rr-angle-small-up"
							/>
						) : (
							<FlatIcon
								className="ml-auto"
								icon="rr-angle-small-down"
							/>
						)}
					</>
				)}
			</div>
			<div
				className={`overflow-hidden ${
					open ? "max-h-[999px] opacity-100" : "max-h-[0px] opacity-0"
				} !duration-200 ${containerClassName}`}
			>
				{children}
			</div>
		</div>
	);
};

export default CollapseMenu;
