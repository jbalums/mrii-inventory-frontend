import React from "react";
import Button from "../Button";
import { FiPlus } from "react-icons/fi";
const ContainerCard = (props) => {
	const {
		mainClassName = "",
		title,
		subtitle,
		actions,
		children,
		className = "",
	} = props;
	return (
		<div
			className={` mx-auto w-full flex flex-col duration-200 hover:shadow-lg bg-background rounded-xl ${mainClassName}`}
		>
			{(title || subtitle || actions) && (
				<div className="w-full flex border-b p-6">
					<div className="flex flex-col">
						{title ? (
							<h2 className="text-xl font-bold">{title}</h2>
						) : (
							""
						)}
						{subtitle ? <p className="text-sm ">{subtitle}</p> : ""}
					</div>
					{actions ? actions : ""}
				</div>
			)}
			<div className={`flex w-full flex-col p-6 ${className}`}>
				{children}
			</div>
		</div>
	);
};

export default ContainerCard;
