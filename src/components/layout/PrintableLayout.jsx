import { forwardRef, useRef } from "react";
import FlatIcon from "../FlatIcon";

const portraitShort = `min-h-[11in] w-[8.5in]`;
const portraitLong = `min-h-[11in] w-[13in]`;
const landscapeShort = `min-h-[8.5in] w-[11in]`;
const landscapeLong = `min-h-[8.5in] w-[13in]`;
const PrintableLayout = (props, ref) => {
	const {
		date = null,
		size = "short",
		orientation = "portrait",
		className = "",
		children,
		displayDefaultHeading = true,
		mactanRock = "MACTAN ROCK INDUSTRIES, INC.",
		mactanRocDesc = "Manufacturer of Water Treatment Chemicals and Equipment",
		title,
		titleClassName = "font-bold text- text-base w-full",
		subtitle,
		subtitleClassName = "text-left text-sm w-full",
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
		<div className={` bg-slate-600 py-11  ${className}`}>
			<div
				className={` bg-white p-[0.5in] mx-auto ${
					orientation == "portrait"
						? size == "short"
							? portraitShort
							: portraitLong
						: orientation == "landscape"
						? size == "short"
							? landscapeShort
							: landscapeLong
						: ""
				} relative`}
				id="document-content"
				ref={ref}
			>
				{displayDefaultHeading && (
					<div className="flex flex-col items-center justify-center mb-4">
						<p className="text-base font-bold mb-0">{mactanRock}</p>
						<p className="font- text-sm mb-0">{mactanRocDesc}</p>
						<div className="flex items-center justify-center gap-4 text-xs mb-[0.5in]">
							<span className="flex items-center">
								<FlatIcon
									icon="sr-phone-call"
									className="text-[10px] mr-1 -mb-[2px]"
								/>
								+63 32-2384354
							</span>
							<span className="flex items-center">
								<FlatIcon
									icon="sr-envelope"
									className="text-[10px] mr-1 -mb-[2px]"
								/>
								sales@info@mactanrock.com
							</span>
							<span className="flex items-center">
								<FlatIcon
									icon="rr-globe"
									className="text-[10px] mr-1 -mb-[2px]"
								/>
								www.mactanrock.com
							</span>
						</div>
						{title && <p className={titleClassName}>{title}</p>}
						{subtitle && (
							<p className={subtitleClassName}>{subtitle}</p>
						)}
						{date ? (
							<p className="font-light text-xs w-full">
								Date:{" "}
								<b className="font-semibold">
									{date ? date : currentDate()}
								</b>
							</p>
						) : (
							""
						)}
					</div>
				)}
				{children}
			</div>
		</div>
	);
};

export default forwardRef(PrintableLayout);
