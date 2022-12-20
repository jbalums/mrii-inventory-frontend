import { forwardRef } from "react";

const PrintableLayout = (props, ref) => {
	const {
		children,
		displayDefaultHeading = true,
		title = "MACTAN ROCK INDUSTRIES, INC.",
		subtitle = "Manufacturer of Water Treatment Chemicals and Equipment",
	} = props;
	return (
		<div ref={ref}>
			{displayDefaultHeading && (
				<div className="flex flex-col items-center justify-center mb-4">
					<h2 className="text-lg font-bold mb-2">{title}</h2>
					<p className="font-light text-sm">{subtitle}</p>
				</div>
			)}
			{children}
		</div>
	);
};

export default forwardRef(PrintableLayout);
