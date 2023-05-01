import { formatToCurrency } from "@/libs/helpers";
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
const excluded_cols = ['price', 'date', 'actual_cost', 'remain_value']
const InputsOfReceipts = () => {
	const componentRef = useRef(null);
	const [list, setList] = useState([]);
	const {
		data,
		loading: dataLoading,
		setPage,
	} = useDataTable(`/inventory/inputs-of-receipts`, setList, {});
	useEffect(() => {
		setPage("all");
	}, []);
	useEffect(() => {
		setList(data?.data || []);
	}, [data]);

	const formatDate = (date) => {
		let d = new Date(date);
		return `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()} ${d.getHours() >= 12 ? 'PM':'AM'}`;
	}
	const columns = useMemo(
		() => [
			{
				header: "Date",
				accessorKey: "date_",
                cell: (data) => {
                    return formatDate(data?.created_at)
                }
			},
			{
				header: "Reference",
				accessorKey: "account_code",
                cell: (data) => {
                    return data?.inventory?.product?.account_code
                }
			},
			{
				header: "Quantity",
				accessorKey: "qty",
                className: ' !text-center',
                cell: (data) => {
                    return `${data?.quantity}`
                }
			}, 
			{
				header: "Item ID",
				accessorKey: "code",
                cell: (data) => {
                    return data?.inventory?.product?.code
                }
			},
			{
				header: "Description",
				accessorKey: "name",
                cell: (data) => {
                    return data?.inventory?.product?.name
                }
			}, 
			{
				header: "Stocking U/M",
				accessorKey: "unit_measurement",
                className: ' !text-center',
                cell: (data) => {
                    return data?.inventory?.product?.unit_measurement
                }
			}, 
		],
		[]
	);

	return (
		<>
			<PrintAppLayout containerClassName={`!p-0`} backBtn >
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
									type="background"
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
									type="background"
									loading={dataLoading}
								>
									<FlatIcon icon="rr-print" /> Print
								</Button>
							)}
							content={() => componentRef.current}
						/>
					</div>
				</div>
				<PrintableLayout orientation="portrait" size="long"
					ref={componentRef}
					className={``}
					title="Inputs of Receipts"
				>
					<div className="printable-table">
						<table className="">
							<thead>
								<tr> 
									{columns?.map((col) => {
										return (
											<th className={`!text-[8pt] !text-left !font-semibold ${
                                                col.className }`}>
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
                                                    if(excluded_cols.includes(col.accessorKey)){
                                                        if(col.accessorKey == 'actual_cost' || col.accessorKey == "remain_value")
                                                            return (
                                                                <td className="!text-[8pt] !text-right">
                                                                    {formatToCurrency(
                                                                        parseFloat(item['total_quantity'] || 0) * 
                                                                        parseFloat(item['price'] || 0)
                                                                    )}
                                                                </td>
                                                            );
                                                        if(col.accessorKey == 'price')
                                                                return (
                                                                    <td className="!text-[8pt] !text-right">
                                                                        {formatToCurrency(item['price'])}
                                                                    </td>
                                                                );
                                                        }else{
                                                            return (
                                                                <td className={`!text-[8pt] !text-left ${
                                                                    col.className }`}>
                                                                    {
                                                                       col
                                                                       ?.cell ? col
                                                                                .cell(item) : item[
                                                                            col
                                                                                .accessorKey
                                                                        ]
                                                                    }
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
