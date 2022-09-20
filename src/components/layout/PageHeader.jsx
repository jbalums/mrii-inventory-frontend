import React from "react";

const PageHeader = (props) => {
	const { title } = props;
	return (
		<div className="flex h-[76px] items-center border-b p-6 bg-foreground">
			{title ? <h1 className="text-xl font-bold">{title}</h1> : ""}
		</div>
	);
};

export default PageHeader;
