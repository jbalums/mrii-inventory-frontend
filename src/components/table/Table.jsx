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
		loading,
		loadingMessage = "Gathering data...",
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
					{loading ? (
						<tr>
							<td colSpan={999}>
								<div className="w-full flex items-center justify-center">
									{loadingMessage}
								</div>
							</td>
						</tr>
					) : (
						""
					)}
					{data?.map((row, index) => {
						return (
							<tr key={`tr-${index}`}>
								{columns.map((col, i) => {
									return (
										<td
											className={col.cellClassName}
											key={`tr-${index}-td-${i}`}
										>
											{row[col.id]}
										</td>
									);
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
