import React from "react";

const PageHeader = (props) => {
	const { title, children } = props;
	return (
		<div className="flex h-[76px] items-center border-b p-6 bg-foreground">
			{title ? <h1 className="text-xl font-bold">{title}</h1> : ""}
			{children}
		</div>
	);
};

export default PageHeader;
