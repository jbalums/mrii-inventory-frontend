import React from "react";
import Button from "../Button";
import { FiPlus } from "react-icons/fi";
const ContainerCard = (props) => {
	const { title, subtitle, actions, children } = props;
	return (
		<div className=" mx-auto w-full flex flex-col shadow-lg bg-white rounded-lg">
			<div className="w-full flex border-b p-6">
				<div className="flex flex-col">
					{title ? <h2 className="text-xl font-bold">{title}</h2> : ""}
					{subtitle ? <p className="text-sm ">{subtitle}</p> : ""}
				</div>
				{actions ? actions : ""}
			</div>
			<div className="flex w-full flex-col p-6">{children}</div>
		</div>
	);
};

export default ContainerCard;
