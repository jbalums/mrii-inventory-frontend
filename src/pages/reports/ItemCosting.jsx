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
import useDataTable from "@/src/helpers/useDataTable";
import Html2Pdf, { html2pdf } from "js-html2pdf";
import { useEffect, useMemo } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

// import Pdf from "react-to-pdf";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
const excluded_cols = ["price", "date", "actual_cost", "remain_value"];
const ItemCosting = () => {
	const componentRef = useRef(null);
	const [list, setList] = useState([]);
	const [categories, setCategories] = useState([]);
	const { getCategories } = useItemCategories();
	const {
		data,
		setFilters,
		filters,
		loading: dataLoading,
		setPaginate,
		setPage,
	} = useDataTable(`/inventory/item-costing`, setList, {});
	useEffect(() => {
		setPage("all");
		setPaginate("all");
		getCategories().then((res) => {
			setCategories(res.data.data);
		});
	}, []);
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
		[]
	);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onPrintError: (error) => console.log(error),
		print: async (printIframe) => {
			console.log(printIframe);
			const document = printIframe;
			document.style.display = "block";
			if (document) {
				// const ticketElement = document.getElementsByClassName("ticket")[0];
				// ticketElement.style.display = "block";
				const options = {
					margin: 0.15,
					filename: `ITEMCOSTING-${currentDate()}`,
					jsPDF: {
						unit: "in",
						format: [12.5, 8.5],
						orientation: "landscape",
					},
				};
				options.download = true;
				options.source = document;
				console.log("PRINTING");
				const exporter = new Html2Pdf(document, options);
				await exporter.getPdf(options);
				// Html2Pdf.getPdf(options);
				console.log("PRINTING", exporter);

				// exporter.getPdf(true).then((pdf) => {
				// 	console.log("doing something before downloading pdf file");
				// 	pdf.save();
				// });
			}
		},
	});

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
							{/* <TextInputField
								label="Date"
								labelClassName="text-white !text-xs !font-normal -mb-[0px]"
								placeholder="Enter a date"
								type="date"
								inputClassName="!h-9"
								defaultValue={dateTodayInput()}
								value={filters?.date}
							/> */}
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
						<Button
							className="gap-2 !rounded-lg !text-sm font-normal shadow-lg"
							type="secondary"
							loading={dataLoading}
							onClick={handlePrint}
						>
							<FlatIcon icon="rr-file-pdf" className="text-xl" />{" "}
							Save as PDF
						</Button>
						<ReactToPrint
							trigger={() => (
								<Button
									className="gap-2 !rounded-lg !flex-col items-center justify-center !text-sm font-normal shadow-lg"
									type="accent"
									loading={dataLoading}
								>
									<span className="font-bold flex items-center gap-1">
										<FlatIcon
											icon="rr-print"
											className="text-xl"
										/>
										PRINT / Save as PDF
									</span>
									<span className="absolute -mb-6 ml-5 text-[8px]">
										Select "destination" on dialog
									</span>
								</Button>
							)}
							content={() => componentRef.current}
						/>
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
						<>
							Item Costing: &nbsp;
							<u>{currentDate()}</u>
						</>
					}
				>
					<div className="printable-table">
						<table className="">
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
																	col.accessorKey
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
																						0
																				) *
																					parseFloat(
																						item[
																							"price"
																						] ||
																							0
																					)
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
																						0
																				) *
																					parseFloat(
																						item[
																							"price"
																						] ||
																							0
																					)
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
																				]
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
																					item
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
										}
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
