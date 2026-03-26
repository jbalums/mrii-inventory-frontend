import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Button from "../Button";
import FlatIcon from "../FlatIcon";
import SelectInputField from "../forms/SelectInputField";
import TextInputField from "../forms/TextInputField";

const PrintableTable = (props) => {
	const {
		columns,
		/* 
		className,
		cellClassName,
		text,
		id,
		*/
		className = "",
		pagination = false,
		meta,
		data,
		loading,
		rowClick = false,
		rowHighlight = false,
		tableClassName = "",
		onTableChange,
		show = [10, 20, 50, 100],
		loadingMessage = "Gathering data...",
		emptyMessage = "No data available",
		paginationClassName = "",
	} = props;
	const [paginationState, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const table = useReactTable({
		data,
		columns,
		pageCount: meta?.last_page || 1,
		manualPagination: true,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: (data) => {
			if (data) {
				setPagination(data);
			}
		},
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<div
			className={`border-collapse w-full max-w-[100%] printable-table ${
				pagination ? "" : ""
			}`}
		>
			<div className={`w-full overflow-auto  ${className}`}>
				<table
					className={`border-none ${tableClassName} ${
						pagination ? "" : ""
					}`}
				>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={`headerGroup.id-${headerGroup.id}`}>
								{headerGroup.headers.map((header, index) => (
									<th
										key={`header.id-${index}-${headerGroup.id}-${header.id}`}
										className={`${header.column.columnDef?.className} ${header.column.columnDef?.thClassName}`}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext(),
												)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={999}>
									<div className="w-full flex items-center justify-start lg:items-center lg:justify-center py-4 text-placeholder">
										{loadingMessage}
									</div>
								</td>
							</tr>
						) : table.getRowModel().rows.length == 0 ? (
							<tr>
								<td colSpan={999}>
									<div className="w-full flex items-center justify-start lg:items-center lg:justify-center py-4 text-placeholder">
										{emptyMessage}
									</div>
								</td>
							</tr>
						) : (
							table.getRowModel().rows.map((row) => (
								<tr
									key={`row.id-${row.id} `}
									className={`group`}
								>
									{row
										.getVisibleCells()
										.map((cell, index) => (
											<td
												key={`cell.id-${
													cell.id || index
												}`}
												className={`duration-300  ${cell.column?.columnDef?.className}
											`}
												onClick={() => {
													if (
														cell.column.columnDef
															?.header !=
															"Action" ||
														cell.column.columnDef
															?.accessorKey !=
															"action"
													) {
														if (rowClick) {
															rowClick(row);
														}
													}
												}}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</td>
										))}
								</tr>
							))
						)}
						{/* {data?.map((row, index) => {
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
					})} */}
					</tbody>
				</table>
			</div>
		</div>
	);
};

/* 
META FORMAT 

current_page
from
last_page
per_page
to
total
*/
export default PrintableTable;
