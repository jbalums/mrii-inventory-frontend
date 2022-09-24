import React from "react";

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
} from "@tanstack/react-table";
import TextInputField from "../forms/TextInputField";
import Button from "../Button";
import { FiChevronLeft, FiChevronsLeft } from "react-icons/fi";
import FlatIcon from "../FlatIcon";
import SelectInputField from "../forms/SelectInputField";
import { useEffect } from "react";
import { useState } from "react";
const Table = (props) => {
	const {
		columns,
		/* 
		className,
		cellClassName,
		text,
		id,
		*/
		pagination = false,
		meta = null,
		data,
		loading,
		show = [10, 20, 50, 100],
		loadingMessage = "Gathering data...",
		emptyMessage = "No data to load.",
	} = props;
	const [paginationState, setPagination] = useState({
		pageIndex: 1,
		pageSize: 10,
	});
	const table = useReactTable({
		data,
		columns,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: (data) => {
			if (data) {
				setPagination(data);
			}
		},
		getCoreRowModel: getCoreRowModel(),
	});
	useEffect(() => {
		console.log("meta", meta);
		if (meta) {
			table.setPageSize(meta?.per_page);
			table.setPageCount(meta?.last_page);
		}
	}, [meta]);
	useEffect(() => {
		console.log(
			"paginationChange222",
			paginationState.pageIndex,
			paginationState.pageSize
		);
	}, [paginationState]);
	return (
		<div className={`border-collapse w-full table ${pagination ? "" : ""}`}>
			<table className={`border-none  ${pagination ? "" : ""}`}>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={`headerGroup.id-${headerGroup.id}`}>
							{headerGroup.headers.map((header, index) => (
								<th
									key={`header.id-${index}-${headerGroup.id}-${header.id}`}
									className={header.column.columnDef?.className || ""}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
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
								<div className="w-full flex items-center justify-center">
									{loadingMessage}
								</div>
							</td>
						</tr>
					) : table.getRowModel().rows.length == 0 ? (
						<tr>
							<td colSpan={999}>
								<div className="w-full flex items-center justify-center">
									{emptyMessage}
								</div>
							</td>
						</tr>
					) : (
						table.getRowModel().rows.map((row) => (
							<tr key={`row.id-${row.id}`}>
								{row.getVisibleCells().map((cell) => (
									<td
										key={`cell.id-${cell.id}`}
										className={cell.column.columnDef?.className || ""}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
			{pagination ? (
				<div className="flex items-center gap-6 pt-6">
					<div className="flex items-center text-dark text-sm">
						<label>Show:</label>
						<SelectInputField
							onChange={(e) => {
								table.setPageSize(Number(e.target.value));
							}}
							options={show.map((x) => ({
								label: x,
								value: x,
							}))}
							className="ml-4 w-16"
							inputClassName="!h-8 !p-2 !py-1 !text-center"
						/>
					</div>
					<div className="flex items-center text-dark text-sm">
						<label>Go to page:</label>
						<TextInputField
							min={1}
							max={table.getPageCount()}
							type={"number"}
							className="ml-4 w-[80px]"
							inputClassName="!h-8 !p-2 !text-center"
							// defaultValue={table.getState().pagination.pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								table.setPageIndex(page);
							}}
						/>
					</div>
					<div className="flex gap-1">
						<Button
							type="foreground"
							size="sm"
							disabled={!table.getCanPreviousPage()}
							onClick={() => table.setPageIndex(0)}
						>
							<FlatIcon icon="rs-angle-double-left" />
						</Button>
						<Button
							type="foreground"
							size="sm"
							disabled={!table.getCanPreviousPage()}
							onClick={() => table.previousPage()}
						>
							<FlatIcon icon="rs-angle-left" />
						</Button>
						<div className="flex items-center gap-2 mx-2 text-sm">
							Page <b>{table.getState().pagination.pageIndex + 1}</b> of{" "}
							<b>{table.getPageCount()}</b>
						</div>
						<Button
							type="foreground"
							size="sm"
							disabled={!table.getCanNextPage()}
							onClick={() => table.nextPage()}
						>
							<FlatIcon icon="rs-angle-right" />
						</Button>
						<Button
							type="foreground"
							size="sm"
							disabled={!table.getCanNextPage()}
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						>
							<FlatIcon icon="rs-angle-double-right" />
						</Button>
					</div>
				</div>
			) : (
				""
			)}
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
export default Table;
