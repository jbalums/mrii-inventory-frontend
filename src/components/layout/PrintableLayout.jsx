import { forwardRef } from "react";

const PrintableLayout = (props, ref) => {
	const {
		className = "",
		children,
		displayDefaultHeading = true,
		title = "MACTAN ROCK INDUSTRIES, INC.",
		subtitle = "Manufacturer of Water Treatment Chemicals and Equipment",
	} = props;
	const currentDate = () => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let d = new Date();
		// ("January 15, 2023");
		return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
	};
	return (
		<div ref={ref} className={className}>
			{displayDefaultHeading && (
				<div className="flex flex-col items-center justify-center mb-4">
					<h2 className="text-lg font-bold mb-2">{title}</h2>
					<p className="font-light text-sm mb-3">{subtitle}</p>
					<p className="font-light text-sm w-full px-1">
						Date: <b>{currentDate()}</b>
					</p>
				</div>
			)}
			{children}
		</div>
	);
};

export default forwardRef(PrintableLayout);
