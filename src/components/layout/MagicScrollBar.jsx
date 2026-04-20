import { useLayoutEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
const MagicScrollBar = ({
	children,
	id,
	autoHeightMax,
	autoHeightMin,
	onBottomEnd,
	...rest
}) => {
	const scrollbars_ref = useRef(null);
	const [autoHide, setAutoHide] = useState(true);
	const [maxH, setMaxH] = useState(
		typeof window === "object" ? window.innerHeight - 308 : 0,
	);
	const [minH, setMinH] = useState(
		typeof window === "object" ? window.innerHeight - 308 : 0,
	);
	useLayoutEffect(() => {
		const updateSize = () => {
			if (autoHeightMax != undefined) {
				setMaxH(autoHeightMax);
			} else {
				setMaxH(
					typeof window === "object" ? window.innerHeight - 308 : 0,
				);
			}
			if (autoHeightMin != undefined) {
				setMinH(autoHeightMin);
			} else {
				setMinH(
					typeof window === "object" ? window.innerHeight - 308 : 0,
				);
			}
		};

		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, [autoHeightMax, autoHeightMin]);
	const toggle = () => {
		setAutoHide((prevState) => !prevState);
	};

	return (
		<Scrollbars
			ref={scrollbars_ref}
			key={`maxH-minH-${maxH}-${minH}`}
			id={id}
			onMouseEnter={toggle}
			onMouseLeave={toggle}
			autoHide={autoHide}
			autoHeight
			autoHeightMax={maxH}
			autoHeightMin={minH}
			thumbMinSize={50}
			onScrollStop={(values) => {
				if (
					scrollbars_ref?.current?.getClientHeight() +
						scrollbars_ref?.current?.getScrollTop() +
						25 >=
					scrollbars_ref?.current?.getScrollHeight()
				) {
					if (onBottomEnd) {
						onBottomEnd();
					}
				}
			}}
			renderThumbVertical={(props) => {
				return (
					<div className="bg-[rgba(0,0,0,0.4)] rounded-lg w-[8px!important]" />
				);
			}}
			{...rest}
		>
			{children}
		</Scrollbars>
	);
};

export default MagicScrollBar;
