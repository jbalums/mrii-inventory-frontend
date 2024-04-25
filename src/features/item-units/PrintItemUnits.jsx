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

import Pdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
const PrintItemUnits = () => {
	const componentRef = useRef(null);
	const [list, setList] = useState([]);
	const {
		data,
		loading: dataLoading,
		setPage,
	} = useDataTable(`/management/units`, setList, {});
	useEffect(() => {
		setPage("all");
	}, []);
	useEffect(() => {
		setList(data?.data || []);
	}, [data]);

	const columns = useMemo(
		() => [
			{
				header: "Name",
				accessorKey: "name",
			},
			{
				header: "Description",
				accessorKey: "description",
			},
		],
		[]
	);

	return (
		<>
			<PrintAppLayout containerClassName={`!p-0`} backBtn>
				<div className="w-full py-5 bg-slate-700 sticky top-0 z-20">
					<div className="flex items-center justify-end ml-auto gap-4 w-[8.5in] mx-auto">
						<Pdf
							options={{
								unit: "in",
								format: [8.5, 11],
							}}
							targetRef={componentRef.current}
							filename={`request-order-${data?.account_code}.pdf`}
							onComplete={() => {
								toast.success("PDF export success!");
							}}
						>
							{({ toPdf }) => (
								<Button
									className="gap-2 !rounded font-normal shadow-lg"
									type="secondary"
									onClick={toPdf}
									loading={dataLoading}
								>
									<FlatIcon
										icon="rr-download"
										className="text-xs"
									/>{" "}
									Save as PDF
								</Button>
							)}
						</Pdf>
						<ReactToPrint
							trigger={() => (
								<Button
									className="gap-2 !rounded font-normal shadow-lg"
									type="accent"
									loading={dataLoading}
								>
									<FlatIcon icon="rr-print" /> Print
								</Button>
							)}
							content={() => componentRef.current}
						/>
					</div>
				</div>
				<PrintableLayout
					ref={componentRef}
					className={``}
					title="Product categories"
				>
					<div className="printable-table">
						<table className="">
							<thead>
								<tr>
									<td className="!text-[8pt] w-[44px] !text-center">
										#
									</td>
									{columns?.map((col) => {
										return (
											<th className="!text-[8pt] !text-left !font-semibold">
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
												<td className="!text-[8pt] !text-center">
													{index + 1}
												</td>
												{columns?.map((col) => {
													return (
														<td className="!text-[8pt] !text-left">
															{
																item[
																	col
																		.accessorKey
																]
															}
														</td>
													);
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

export default PrintItemUnits;
