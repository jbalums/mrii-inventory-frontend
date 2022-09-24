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
        meta,
        data,
        loading,
        rowClick,
        tableClassName = "",
        onTableChange,
        show = [10, 20, 50, 100],
        loadingMessage = "Gathering data...",
        emptyMessage = "No data to load.",
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
                console.log("TABLETABLE onTableChange 000", data);
                setPagination(data);
            }
        },
        getCoreRowModel: getCoreRowModel(),
    });
    useEffect(() => {
        console.log("TABLETABLE meta11", meta);
        if (meta) {
            console.log("TABLETABLE meta222", meta?.last_page);
            // table.setPageCount(meta?.last_page);
        }
    }, [meta]);
    useEffect(() => {
        console.log(
            "TABLETABLE onTableChange 111",
            paginationState.pageIndex,
            paginationState.pageSize
        );
        if (onTableChange) {
            onTableChange({
                pageIndex: paginationState.pageIndex,
                pageSize: paginationState.pageSize,
            });
        }
    }, [paginationState]);
    return (
        <div className={`border-collapse w-full table ${pagination ? "" : ""}`}>
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
                                    className={
                                        header.column.columnDef?.className || ""
                                    }
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
                            <tr key={`row.id-${row.id} `} className="group">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={`cell.id-${cell.id}`}
                                        className={
                                            "duration-300 " +
                                                cell.column.columnDef
                                                    ?.className || "" + rowClick
                                                ? cell.column.columnDef
                                                      ?.header != "Action" ||
                                                  cell.column.columnDef
                                                      ?.accessorKey != "action"
                                                    ? "cursor-pointer group-hover:font-semibold"
                                                    : ""
                                                : ""
                                        }
                                        onClick={() => {
                                            if (
                                                cell.column.columnDef?.header !=
                                                    "Action" ||
                                                cell.column.columnDef
                                                    ?.accessorKey != "action"
                                            ) {
                                                if (rowClick) {
                                                    rowClick(row);
                                                }
                                            }
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
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
            {pagination ? (
                <div className="flex items-center gap-6 pt-6">
                    <div className="flex items-center text-dark text-sm">
                        <label>Show:</label>
                        <SelectInputField
                            value={paginationState.pageSize}
                            onChange={(e) => {
                                // table.setPageSize(Number(e.target.value));

                                setPagination((data) => ({
                                    ...data,
                                    pageSize: Number(e.target.value),
                                }));
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
                                const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                table.setPageIndex(page);
                            }}
                        />
                    </div>
                    <div className="flex gap-1">
                        <Button
                            type="foreground"
                            size="sm"
                            disabled={paginationState.pageIndex <= 0}
                            onClick={() => table.setPageIndex(0)}
                        >
                            <FlatIcon icon="rs-angle-double-left" />
                        </Button>
                        <Button
                            type="foreground"
                            size="sm"
                            disabled={paginationState.pageIndex <= 0}
                            onClick={() => table.previousPage()}
                        >
                            <FlatIcon icon="rs-angle-left" />
                        </Button>
                        <div className="flex items-center gap-2 mx-2 text-sm">
                            Page <b>{paginationState.pageIndex + 1}</b> of{" "}
                            <b>{table.getPageCount()}</b>
                        </div>
                        <Button
                            type="foreground"
                            size="sm"
                            disabled={
                                paginationState.pageIndex ==
                                table.getPageCount() - 1
                            }
                            onClick={() => table.nextPage()}
                        >
                            <FlatIcon icon="rs-angle-right" />
                        </Button>
                        <Button
                            type="foreground"
                            size="sm"
                            disabled={
                                paginationState.pageIndex ==
                                table.getPageCount() - 1
                            }
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
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
