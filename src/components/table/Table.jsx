import React from "react";

const Table = (props) => {
	const {
		columns,
		/* 
		className,
		cellClassName,
		text,
		id,
		*/
		data,
	} = props;
	return (
		<div className="border-collapse w-full table">
			<table>
				<thead>
					<tr>
						{columns.map((col) => {
							return (
								<th className={col.className} key={`th-${col.id}`}>
									{col.text}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{data?.map((row) => {
						return (
							<tr>
								{columns.map((col) => {
									return <td className={col.cellClassName}>{row[col.id]}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
