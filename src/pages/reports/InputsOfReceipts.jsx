import {
	formatToCurrency,
	currentDate,
	formatDateYYYMMDD,
} from "@/libs/helpers";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import PrintAppLayout from "@/src/components/PrintAppLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import PrintableLayout from "@/src/components/layout/PrintableLayout";
import PrintableTable from "@/src/components/table/PrintableTable";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo } from "react";
import { useRef, useState } from "react";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";

import Pdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DateRangePicker } from "rsuite";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import { useItemCategories } from "@/src/features/item-categories/hooks/useItemCategoriesHook";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const predefinedBottomRanges = [
	{
		label: "Today",
		value: [new Date(), new Date()],
	},
	{
		label: "Yesterday",
		value: [addDays(new Date(), -1), addDays(new Date(), -1)],
	},
	{
		label: "This week",
		value: [startOfWeek(new Date()), endOfWeek(new Date())],
	},
	{
		label: "Last 7 days",
		value: [subDays(new Date(), 6), new Date()],
	},
	{
		label: "Last 30 days",
		value: [subDays(new Date(), 29), new Date()],
	},
	{
		label: "This month",
		value: [startOfMonth(new Date()), new Date()],
	},
	{
		label: "Last month",
		value: [
			startOfMonth(addMonths(new Date(), -1)),
			endOfMonth(addMonths(new Date(), -1)),
		],
	},
	{
		label: "This year",
		value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
	},
	{
		label: "Last year",
		value: [
			new Date(new Date().getFullYear() - 1, 0, 1),
			new Date(new Date().getFullYear(), 0, 0),
		],
	},
	{
		label: "All time",
		value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
	},
];

const excluded_cols = ["price", "date", "actual_cost", "remain_value"];
const InputsOfReceipts = () => {
	const componentRef = useRef(null);
	const tableRef = useRef(null);
	const [list, setList] = useState([]);
	const [branches, setBranches] = useState([]);
	const [selectedBranch, setSelectedBranch] = useState("");
	const { user } = useAuth();
	const {
		data,
		loading: dataLoading,
		setPage,
		filters,
		setFilters,
	} = useDataTable(`/inventory/inputs-of-receipts`, setList, {});

	const { getCategories } = useItemCategories();
	const { getBranches } = useBranchLocation();

	const [categories, setCategories] = useState([]);
	const canSelectBranch =
		user?.data?.user_type === "admin" && user?.data?.branch_id == 1;

	useEffect(() => {
		setPage("all");
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

	const formatDate = (date) => {
		let d = new Date(date);
		return `${d.getDay()}/${
			d.getMonth() + 1
		}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()} ${
			d.getHours() >= 12 ? "PM" : "AM"
		}`;
	};
	const columns = useMemo(
		() => [
			{
				header: "Date",
				accessorKey: "date_",
				cell: (data) => {
					return formatDate(data?.created_at);
				},
			},
			{
				header: "Item ID",
				accessorKey: "code",
				cell: (data) => {
					return data?.inventory?.product?.code;
				},
			},
			{
				header: "Description",
				accessorKey: "name",
				cell: (data) => {
					return data?.inventory?.product?.name;
				},
			},

			{
				header: "Quantity",
				accessorKey: "qty",
				className: " !text-center",
				cell: (data) => {
					return `${data?.quantity}`;
				},
			},
			{
				header: "Stocking U/M",
				accessorKey: "unit_measurement",
				className: " !text-center",
				cell: (data) => {
					return data?.inventory?.product?.unit_measurement;
				},
			},
			{
				header: "Details",
				accessorKey: "details",
				cell: (data) => {
					return data?.details ? (
						data?.details
					) : data?.receive?.purchase_order ? (
						<a
							href={`/receiving?po_number=${data?.receive?.purchase_order}`}
						>
							PO #{data?.receive?.purchase_order}
						</a>
					) : (
						<a
							href={`/request-orders/${data?.request?.account_code}`}
						>
							Ref #{data?.request?.account_code}
						</a>
					);
				},
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
			{ wch: 20 },
			{ wch: 30 },
			{ wch: 75 },
			{ wch: 5 },
			{ wch: 5 },
			{ wch: 6 },
			{ wch: 25 },
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

		saveAs(data, `Inputs of Receipts - ${currentDate()}.xlsx`);
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
								Inputs of Receipts
							</h1>
							<span className="text-slate-400 text-sm">
								Today: <b>{currentDate()}</b>
							</span>
						</div>
						<div className="flex items-center gap-4">
							{canSelectBranch ? (
								<ReactSelectInputField
									className="w-full lg:w-[212px] -mt-1"
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
										{
											label: "All branches",
											value: "",
										},
										...branches?.map((branch) => ({
											label: branch?.name,
											value: branch?.id,
										})),
									]}
								/>
							) : (
								""
							)}
							<div className="pt-[6px]">
								<DateRangePicker
									ranges={predefinedBottomRanges}
									label="Date range:"
									format="MM-dd-yyyy"
									onClean={() => {
										setFilters((filters) => ({
											...filters,
											date_from: "",
											date_to: "",
										}));
									}}
									onChange={(value) => {
										console.log("onChange", value);
										setFilters((filters) => ({
											...filters,
											date_from: formatDateYYYMMDD(
												new Date(value[0]),
											),
											date_to: formatDateYYYMMDD(
												new Date(value[1]),
											),
										}));
									}}
								/>
							</div>

							<ReactSelectInputField
								className="w-full lg:w-[212px] -mt-1"
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
					orientation="portrait"
					size="long"
					ref={componentRef}
					className={``}
					title={
						<div className="flex w-full">
							<span>Inputs of Receipts</span>&nbsp; (
							{canSelectBranch
								? branches.find((x) => x.id === selectedBranch)
										?.name || "Select a Branch"
								: user?.data?.branch?.name}
							)
						</div>
					}
				>
					<div className="printable-table">
						<table className="" ref={tableRef}>
							<thead>
								<tr>
									{columns?.map((col) => {
										return (
											<th
												className={`!text-[8pt] !text-left !font-semibold ${col.className}`}
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
									list?.map((item, index) => {
										return (
											<tr>
												{columns?.map((col) => {
													if (
														excluded_cols.includes(
															col.accessorKey,
														)
													) {
														if (
															col.accessorKey ==
																"actual_cost" ||
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
										);
									})
								)}
							</tbody>
						</table>
					</div>
				</PrintableLayout>
			</PrintAppLayout>
		</>
	);
};

export default InputsOfReceipts;
