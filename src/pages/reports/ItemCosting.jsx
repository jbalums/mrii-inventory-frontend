import {
	currentDate,
	dateTodayInput,
	formatDateWithTime,
	formatToCurrency,
} from "@/libs/helpers";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import PrintAppLayout from "@/src/components/PrintAppLayout";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ContainerCard from "@/src/components/layout/ContainerCard";
import PrintableLayout from "@/src/components/layout/PrintableLayout";
import PrintableTable from "@/src/components/table/PrintableTable";
import { useItemCategories } from "@/src/features/item-categories/hooks/useItemCategoriesHook";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useAuth } from "@/hooks/useAuth";
import Html2Pdf, { html2pdf } from "js-html2pdf";
import { useEffect, useMemo } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

// import Pdf from "react-to-pdf";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const excluded_cols = ["price", "date", "actual_cost", "remain_value"];
const ItemCosting = () => {
	const componentRef = useRef(null);
	const tableRef = useRef(null);
	const [list, setList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [branches, setBranches] = useState([]);
	const { user } = useAuth();
	const [selectedBranch, setSelectedBranch] = useState(null);
	const { getCategories } = useItemCategories();
	const { getBranches } = useBranchLocation();
	const {
		data,
		setFilters,
		filters,
		loading: dataLoading,
		setPaginate,
		setPage,
	} = useDataTable(`/inventory/item-costing`, setList, {});
	const canSelectBranch =
		user?.data?.user_type === "admin" && user?.data?.branch_id == 1;
	useEffect(() => {
		setPage("all");
		setPaginate("all");
		getCategories().then((res) => {
			setCategories(res.data.data);
		});
	}, []);
	useEffect(() => {
		if (!canSelectBranch) {
			return;
		} else {
			setSelectedBranch(user?.data?.branch_id);
			setFilters((filters) => ({
				...filters,
				branch_id: user?.data?.branch_id,
			}));
		}

		getBranches().then((res) => {
			setBranches(res.data.data);
		});
	}, [canSelectBranch]);
	useEffect(() => {
		setList(data?.data || []);
	}, [data]);

	const columns = useMemo(
		() => [
			{
				header: "Item ID",
				accessorKey: "code",
				cell: (data) => {
					return <span className="">{data?.product?.code}</span>;
				},
			},
			{
				header: "Name",
				accessorKey: "name",
				cell: (data) => {
					return <span className="">{data?.product?.name}</span>;
				},
			},
			{
				header: "Category",
				accessorKey: "category",
				cell: (data) => {
					return (
						<span className="">
							{data?.product?.category?.name}
						</span>
					);
				},
			},
			{
				header: "Qty Received",
				accessorKey: "quantity",
				className: " !text-center",
			},
			{
				header: "Item Cost",
				accessorKey: "price",
				className: " !text-center",
			},
			{
				header: "Actual Cost",
				accessorKey: "actual_cost",
				className: " !text-center",
			},
			{
				header: "Remaining",
				accessorKey: "total_quantity",
				className: " !text-center",
			},
			{
				header: "Remain Value",
				accessorKey: "remain_value",
				className: " !text-center",
			},
		],
		[],
	);

	const exportToExcel = () => {
		const table = tableRef.current;
		if (!table) return;

		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.table_to_sheet(table);
		worksheet["!cols"] = [
			{ wch: 5 },
			{ wch: 20 },
			{ wch: 75 },
			{ wch: 15 },
			{ wch: 5 },
			{ wch: 8 },
			{ wch: 8 },
			{ wch: 8 },
			{ wch: 8 },
		];

		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

		// Create a buffer
		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});

		// Convert buffer to a blob
		const data = new Blob([excelBuffer], {
			type: "application/octet-stream",
		});

		saveAs(data, `Item Costing - ${currentDate()}.xlsx`);
	};

	return (
		<>
			<PrintAppLayout containerClassName={`!p-0`} backBtn>
				<div className="w-full py-5 bg-slate-800 sticky top-0 z-20 shadow-lg shadow-slate-600">
					<Link
						to="/"
						className="h-11 px-6 flex items-center justify-center absolute"
					>
						<img src={"/logo.png"} className="h-8 p-1 bg-white" />
					</Link>
					<div className="flex items-center justify-end mx-auto gap-4 w-[13in]">
						<div className="flex flex-col mr-auto">
							<h1 className="text-white mr-auto text-xl -mb-1">
								Item Costing
							</h1>
							<span className="text-slate-400 text-sm">
								Today: <b>{currentDate()}</b>
							</span>
						</div>
						<div className="flex items-center gap-4">
							{canSelectBranch ? (
								<ReactSelectInputField
									className="w-full lg:w-[212px]"
									placeholder="Select branch"
									label="Select Branch"
									labelClassName="!text-white !text-xs !font-normal -mb-[8px]"
									inputClassName="!h-8"
									value={filters?.branch_id}
									onChange={(data) => {
										setSelectedBranch(data);
										setFilters((filters) => ({
											...filters,
											branch_id: data,
										}));
									}}
									options={[
										...branches?.map((branch) => ({
											label: branch?.name,
											value: branch?.id,
										})),
									]}
								/>
							) : (
								""
							)}
							<ReactSelectInputField
								className="w-full lg:w-[212px]"
								placeholder="Select item category"
								label="Select Item Category"
								labelClassName="!text-white !text-xs !font-normal -mb-[8px]"
								inputClassName="!h-8"
								value={filters?.category_id}
								onChange={(data) => {
									setFilters((filters) => ({
										...filters,
										category_id: data,
									}));
								}}
								options={[
									{
										label: "All",
										value: "",
									},
									...categories?.map((item) => ({
										label: item?.name,
										value: item?.id,
									})),
								]}
							/>
						</div>
						<ReactToPrint
							trigger={() => (
								<Button
									className="gap-2 !rounded-lg !text-sm font-normal shadow-lg"
									type="background"
									loading={dataLoading}
								>
									<FlatIcon
										icon="rr-print"
										className="text-xl"
									/>{" "}
									Print
								</Button>
							)}
							content={() => componentRef.current}
						/>
						<Button
							className="gap-2 !rounded-lg !text-sm font-normal shadow-lg"
							type="accent"
							onClick={exportToExcel}
							loading={dataLoading}
						>
							<FlatIcon icon="rr-download" className="text-xl" />{" "}
							Excel
						</Button>
					</div>
				</div>
				<PrintableLayout
					orientation="landscape"
					size="long"
					ref={componentRef}
					className={``}
					date={
						filters?.date ? formatDateWithTime(filters?.date) : null
					}
					title={
						<div className="w-full flex flex-col">
							<span>
								Item Costing: &nbsp;
								<u className="">{currentDate()}</u>
							</span>
							<span>
								Branch: &nbsp;
								<u>
									{canSelectBranch
										? (branches.find(
												(x) => x.id === selectedBranch,
											)?.name ?? "Select A Branch")
										: user?.data?.branch?.name}
								</u>
							</span>
						</div>
					}
				>
					<div className="printable-table">
						<table className="" ref={tableRef}>
							<thead className="!bg-slate-700">
								<tr>
									<td
										className="!text-[8pt] w-[44px] !text-center"
										style={{ background: "#eee" }}
									>
										#
									</td>
									{columns?.map((col) => {
										return (
											<th
												key={`theader-${col.accessorKey}`}
												className={`!text-[8pt] !text-left !font-semibold ${col.className}`}
												style={{ background: "#eee" }}
											>
												{col.header}
											</th>
										);
									})}
								</tr>
							</thead>

							<tbody>
								{dataLoading ? (
									<tr>
										<td
											colSpan={999}
											className="!text-center"
										>
											Loading...
										</td>
									</tr>
								) : (
									[...list, ...list, ...list]?.map(
										(item, index) => {
											return (
												<>
													<tr>
														<td className="!text-[8pt] !text-center">
															{index + 1}
														</td>
														{columns?.map((col) => {
															if (
																excluded_cols.includes(
																	col.accessorKey,
																)
															) {
																if (
																	col.accessorKey ==
																	"actual_cost"
																)
																	return (
																		<td className="!text-[8pt] !text-right">
																			{formatToCurrency(
																				parseFloat(
																					item[
																						"quantity"
																					] ||
																						0,
																				) *
																					parseFloat(
																						item[
																							"price"
																						] ||
																							0,
																					),
																			)}
																		</td>
																	);
																if (
																	col.accessorKey ==
																	"remain_value"
																)
																	return (
																		<td className="!text-[8pt] !text-right">
																			{formatToCurrency(
																				parseFloat(
																					item[
																						"total_quantity"
																					] ||
																						0,
																				) *
																					parseFloat(
																						item[
																							"price"
																						] ||
																							0,
																					),
																			)}
																		</td>
																	);
																if (
																	col.accessorKey ==
																	"price"
																)
																	return (
																		<td className="!text-[8pt] !text-right">
																			{formatToCurrency(
																				item[
																					"price"
																				],
																			)}
																		</td>
																	);
															} else {
																return (
																	<td
																		className={`!text-[8pt] !text-left ${col.className}`}
																	>
																		{col?.cell
																			? col.cell(
																					item,
																				)
																			: item[
																					col
																						.accessorKey
																				]}
																	</td>
																);
															}
														})}
													</tr>
												</>
											);
										},
									)
								)}
							</tbody>
						</table>
					</div>
				</PrintableLayout>
			</PrintAppLayout>
		</>
	);
};

export default ItemCosting;
