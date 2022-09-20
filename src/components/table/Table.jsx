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
			<table className="border-none">
				<thead>
					<tr>
						{columns.map((col) => {
							return (
								<th
									className={`${col.className} first:rounded-tl-lg last:rouded-tr-lg border-none text-sm`}
									key={`th-${col.id}`}
								>
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
											className={`text-sm ${col.cellClassName}`}
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
