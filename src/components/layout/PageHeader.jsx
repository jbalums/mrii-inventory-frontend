import React from "react";

const PageHeader = (props) => {
	const { title } = props;
	return (
		<div className="flex h-20 items-center border-b p-6 bg-white">
			{title ? <h1 className="text-3xl font-bold">{title}</h1> : ""}
		</div>
	);
};

export default PageHeader;
